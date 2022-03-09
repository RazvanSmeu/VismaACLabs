import { Invalid, Valid, Validation } from '../Validated'

export function validateName(name: string): Validation {
  return Validation.first({
    'Cannot be null': name == null,
    'Cannot be empty': name.length === 0,
    'Must be capitalized': name.charAt(0) !== name.charAt(0).toUpperCase()
  })
}
