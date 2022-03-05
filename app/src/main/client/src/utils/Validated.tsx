export interface Validation {
  readonly isValid: boolean
  readonly isInvalid: boolean
  readonly message: string
}

export const Valid: Validation = {
  isValid: true,
  isInvalid: false,
  message: ''
}

export class Invalid implements Validation {
  isValid: boolean = false
  isInvalid: boolean = true

  private constructor(readonly message: string) {}

  static because(cause: string) {
    return new Invalid(cause)
  }
}
