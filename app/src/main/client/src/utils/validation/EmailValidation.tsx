import { Invalid, Valid, Validation } from '../Validated'

export function validateEmail(text: string): Validation {
  return Validation.first({
    'Cannot be null': text == null,
    'Cannot be empty': text.length === 0,
    'No domain ending': !text.includes('.'),
    'No @ present': !text.includes('@')
  })
}
