import { useEffect, useMemo, useState } from 'react'
import { Invalid, Valid, Validation } from './Validated'

export type Subject<T> = {
  readonly value: T
  set(value: T): void
  reset(): void
  validation: Validation
  setValidation(v: Validation): void
  onChange(handler: (newValue: T) => void): void
  isReady: boolean
}

export function useSubject<T>(
  defaultValue: T = undefined as any,
  validate?: (value: T) => Validation
): Subject<T> {
  const [value, set] = useState<T>(defaultValue)
  const [validationState, setValidation] = useState<Validation>(Valid)

  function reset() {
    set(defaultValue)
  }

  const validation = validate === undefined ? validationState : validate?.(value)

  function onChange(handler: (newValue: T) => void) {
    useEffect(() => {
      handler(value)
    }, [value])
  }

  return {
    value,
    set,
    reset,
    validation,
    setValidation,
    onChange,
    isReady: value !== undefined
  }
}

export function useSubjectField<P, K extends keyof P, C extends P[K]>(
  parent: Subject<P>,
  fieldName: keyof P,
  validate?: (value: C) => Validation
): Subject<C> {
  function onChange(handler: (newValue: C) => void) {
    // useEffect(() => {
    //   handler(value)
    // }, [value])
  }

  if (!parent.isReady) {
    return {
      value: undefined as any,
      set() {
        // do nothing
      },
      reset() {
        // do nothing
      },
      validation: Valid,
      setValidation() {
        // do nothing
      },
      isReady: false,
      onChange
    }
  }
  const defaultValue = useMemo(() => parent.value[fieldName] as C, [])
  const value = parent.value[fieldName] as C
  function set(newValue: C): void {
    const parentValidationsWithoutThis = parent.validation.fields.filter((f) => {
      f.name !== fieldName
    })
    parent.set({
      ...parent.value,
      [fieldName]: newValue
    })
    if (parentValidationsWithoutThis.length === 0) {
      parent.setValidation(Valid)
    } else {
      parent.setValidation({
        ...parent.validation,
        fields: parentValidationsWithoutThis
      })
    }
  }
  function reset() {
    set(defaultValue)
  }

  let validation = validate === undefined ? Valid : validate?.(value)
  if (parent.validation.invalid) {
    const ownValidations = parent.validation.fields
      .filter((f) => {
        return f.name === fieldName
      })
      .map((f) => f.message)
      .join('; ')
    if (ownValidations.length > 0) {
      validation = Invalid.because(ownValidations)
    }
  }

  useEffect(() => {
    if (!parent.validation.invalid && validation.invalid) {
      parent.setValidation(
        Invalid.because('There are field validation errors', {
          name: '' + fieldName,
          message: validation.message
        })
      )
    }
  }, [validation])

  return {
    value,
    set,
    reset,
    validation,
    setValidation() {
      // do nothing
    },
    isReady: parent.isReady,
    onChange
  }
}

export function useUnstableSubject<T>(validate?: (value: T) => Validation): Subject<T | undefined> {
  function newValidate(value: T | undefined): Validation {
    if (value === undefined) {
      return Invalid.because('Value is undefined')
    } else {
      return validate === undefined ? Valid : validate?.(value)
    }
  }
  return useSubject<T | undefined>(undefined, newValidate)
}
