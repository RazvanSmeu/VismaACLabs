import { useStorage } from './useStorage'
import { Subject } from '../Subject'

export type StorageSpec<T> = {
  readonly label: string
  readonly defaultValue: T
  read(): T
  write(t: T): void
  clear(): void
  useAsSubject(): Subject<T>
}

export function StorageSpec<T>(label: string, defaultValue: T): StorageSpec<T> {
  function read(): T {
    const storedValue = localStorage.getItem(label)
    if (storedValue !== null) {
      return JSON.parse(storedValue)
    } else {
      return defaultValue
    }
  }

  function write(t: T): void {
    const result = localStorage.setItem(label, JSON.stringify(t))
    window.dispatchEvent(new Event('storage'))
    return result
  }

  function clear() {
    localStorage.removeItem(label)
    window.dispatchEvent(new Event('storage'))
  }

  const spec: StorageSpec<T> = {
    label,
    defaultValue,
    useAsSubject,
    read,
    write,
    clear
  }

  function useAsSubject(): Subject<T> {
    return useStorage(spec)
  }
  return spec
}

export const SearchSpec = StorageSpec<string>('SEARCH_QUERY', '')
export const TokenSpec = StorageSpec<string | null>('SESSION_KEY', null)
