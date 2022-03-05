import { useMemo, useState } from 'react'
import { Invalid, Valid, Validation } from './Validated'

export type Subject<T> = {
  readonly value: T
  set(value: T): void
  reset(): void
  validation: Validation
}

export function useSubject<T>(defaultValue: T, validate?: (value: T) => Validation): Subject<T> {
  const [value, set] = useState<T>(defaultValue)

  function reset() {
    set(defaultValue)
  }

  const validation = validate === undefined ? Valid : validate?.(value)

  return {
    value,
    set,
    reset,
    validation
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
