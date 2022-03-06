export interface Validation {
  readonly isValid: boolean
  readonly isInvalid: boolean
  readonly messages: string[]
}

export const Validation = {
  concat(...validations: Validation[]): Validation {
    let messages: string[] = []
    for (const validation of validations) {
      messages = [...messages, ...validation.messages]
    }
    if (messages === []) {
      return Valid
    } else {
      return Invalid.because(...messages)
    }
  }
}

export const Valid: Validation = {
  isValid: true,
  isInvalid: false,
  messages: []
}

export class Invalid implements Validation {
  isValid: boolean = false
  isInvalid: boolean = true
  messages: string[] = []

  private constructor(...messages: string[]) {
    this.messages = messages
  }

  static because(...causes: string[]) {
    return new Invalid(...causes)
  }
}
