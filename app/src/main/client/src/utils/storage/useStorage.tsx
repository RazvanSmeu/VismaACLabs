import { watchFile } from 'fs'
import { useEffect, useState } from 'react'
import { Subject } from '../Subject'
import { Valid } from '../Validated'
import { StorageSpec } from './Storage'

export function useStorage<T>(spec: StorageSpec<T>): Subject<T> {
  const [contents, setContentsState] = useState(spec.read())

  function setContents(newContents: T): void {
    spec.write(newContents)
    setContentsState(newContents)
  }

  function clear() {
    spec.write(spec.defaultValue)
    setContentsState(spec.defaultValue)
  }

  useEffect(() => {
    window.addEventListener('storage', () => {
      setContentsState(spec.read())
    })
  }, [])

  return {
    value: contents,
    set: setContents,
    reset: clear,
    validation: Valid,
    setValidation() {},
    onChange() {},
    isReady: true
  }
}
