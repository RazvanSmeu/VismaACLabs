import { useStorage } from './useStorage'
import { Subject } from '../Subject'

export enum Persistence {
  Local,
  Session
}

export type StorageSpec<T> = {
  readonly label: string
  readonly type: Persistence
  readonly defaultValue: T
  useSpec(): Subject<T>
}

export function StorageSpec<T>(type: Persistence, label: string, defaultValue: T): StorageSpec<T> {
  const spec: StorageSpec<T> = {
    label,
    type,
    defaultValue,
    useSpec
  }

  function useSpec(): Subject<T> {
    return useStorage(spec)
  }
  return spec
}

export const SearchSpec = StorageSpec<string>(Persistence.Local, 'SEARCH_QUERY', '')
export const TokenSpec = StorageSpec<string | null>(Persistence.Session, 'SESSION_KEY', null)
