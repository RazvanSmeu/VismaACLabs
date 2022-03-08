export interface Validation {
  readonly invalid: boolean
  readonly message: string
  readonly fields: ValidationField[]
}

export type ValidationField = {
  name: string
  message: string
}

// export const Validation = {
//   concat(...validations: Validation[]): Validation {
//     let messages: string[] = []
//     for (const validation of validations) {
//       messages = [...messages, ...validation.messages]
//     }
//     if (messages === []) {
//       return Valid
//     } else {
//       return Invalid.because(...messages)
//     }
//   }
// }

export const Valid: Validation = {
  invalid: false,
  message: '',
  fields: []
}

export class Invalid implements Validation {
  invalid: boolean = true
  message: string = ''
  fields: ValidationField[] = []

  public constructor(message: string, ...fields: ValidationField[]) {
    this.message = message
    this.fields = fields
  }

  static because(cause: string, ...fields: ValidationField[]) {
    return new Invalid(cause, ...fields)
  }
}
