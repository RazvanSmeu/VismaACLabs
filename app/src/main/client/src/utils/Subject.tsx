import { useMemo, useState } from 'react'
import { Invalid, Valid, Validation } from './Validated'

export type Subject<T> = {
  readonly value: T
  set(value: T): void
  reset(): void
  validation: Validation
  setValidation(v: Validation): void
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

  return {
    value,
    set,
    reset,
    validation,
    setValidation,
    isReady: value !== undefined
  }
}

export function useSubjectField<P, K extends keyof P, C extends P[K]>(
  parent: Subject<P>,
  fieldName: keyof P,
  validate?: (value: C) => Validation
): Subject<C> {
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
      isReady: false
    }
  }
  const defaultValue = useMemo(() => parent.value[fieldName] as C, [])
  const value = parent.value[fieldName] as C
  function set(newValue: C): void {
    parent.set({
      ...parent.value,
      [fieldName]: newValue
    })
  }
  function reset() {
    set(defaultValue)
  }

  const validation = validate === undefined ? Valid : validate?.(value)

  return {
    value,
    set,
    reset,
    validation,
    setValidation() {
      // do nothing
    },
    isReady: parent.isReady
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
