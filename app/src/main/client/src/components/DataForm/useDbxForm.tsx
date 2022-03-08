import { useEffect } from 'react'
import { Identifiable } from '../../types/Identifiable'
import { CrudAPI, Endpoint } from '../../utils/Http'
import { useSubject, useUnstableSubject } from '../../utils/Subject'
import { Validation } from '../../utils/Validated'
import { DbxFormProps } from './DbxForm'

export function useDbxFormByEndpoint<T extends Identifiable>(
  objectId: number,
  template: T,
  api: CrudAPI<T>
): DbxFormProps<T> {
  const subject = useSubject<T>()
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    if (objectId === 0) {
      subject.set(template)
    } else {
      subject.set(await api.GET.call(objectId))
    }
  }

  function save() {
    if (subject.value.id === 0) {
      api.POST.call(subject.value)
    } else {
      api.PUT.call(subject.value)
    }
  }

  function remove() {
    api.DELETE.call(subject.value.id)
  }

  return {
    subject,
    save,
    remove
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
