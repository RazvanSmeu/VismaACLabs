import { Invalid, Valid, Validation } from '../Validated'

export function validateEmail(text: string): Validation {
  if (text === '') {
    return Valid
  }
  if (!text.includes('@')) {
    return Invalid.because('E-mail invalid, no @ present.')
  }
  if (!text.includes('.')) {
    return Invalid.because('No domain ending.')
  }

  return Valid
}
