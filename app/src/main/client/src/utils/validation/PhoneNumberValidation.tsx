import { Validation } from '../Validated'

export function validatePhoneNumber(text: string): Validation {
  return Validation.first({
    'Cannot contain letters': text.toUpperCase() != text || text.toLowerCase() != text
  })
}
