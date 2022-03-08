import { useEffect, useState } from 'react'
import { Identifiable } from '../../types/Identifiable'
import { CrudAPI, Endpoint } from '../../utils/Http'
import { useSubject, useUnstableSubject } from '../../utils/Subject'
import { Validation } from '../../utils/Validated'
import { DbxFormProps, DbxFormState } from './DbxForm'

export function useDbxFormByEndpoint<T extends Identifiable>(
  objectId: number,
  template: T,
  api: CrudAPI<T>
): DbxFormProps<T> {
  const subject = useSubject<T>()
  const [state, setState] = useState<DbxFormState>('IDLE')
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    if (objectId === 0) {
      subject.set(template)
    } else {
      const result = await api.GET.call(objectId)
      if ('invalid' in result) {
        alert('Validation error')
      } else {
        subject.set(result)
      }
    }
  }

  async function save() {
    const endpoint = subject.value.id === 0 ? api.POST : api.PUT
    setState('PROCESSING')
    try {
      await endpoint.call(subject.value)
      setState('SUCCESS')
    } catch (e: any) {
      if ('invalid' in e) {
        subject.setValidation(e as Validation)
      }
      setState('FAILURE')
      throw e
    } finally {
      setTimeout(() => {
        setState('IDLE')
      }, 2000)
    }
  }

  function remove() {
    api.DELETE.call(subject.value.id)
  }

  return {
    subject,
    save,
    remove,
    state
  }
}

export function useDbxFormTest<T extends Identifiable>(template: T) {
  const subject = useSubject(template)
  function save() {
    console.dir(subject.value)
    alert('Saved')
  }
  return {
    subject,
    save
  }
}
