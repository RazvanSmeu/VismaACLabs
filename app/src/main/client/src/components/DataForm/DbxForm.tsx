import React from 'react'
import { Button } from '@mui/material'
import { DbxDatePicker } from '../Input/DbxDatePicker'
import { DbxInput } from '../Input/DbxInput'
import { Subject } from '../../utils/Subject'
import './DbxForm.css'

export type DbxFormProps<T> = {
  subject: Subject<T>
  save(): void
  remove?(): void
}

export function DbxForm<T>(
  props: DbxFormProps<T> & {
    children: React.ReactNode
  }
) {
  return (
    <div className='dbx-form__wrapper'>
      {!props.subject.isReady ? (
        <div>Loading</div>
      ) : (
        <>
          <form className='dbx-form__inner'>{props.children}</form>
          <div className='dbx-form__footer'>
            <Button variant='contained' onClick={props.save}>
              Save
            </Button>
            <Button
              variant='text'
              onClick={() => {
                props.remove?.()
              }}
              // disabled={props.subject.validation.isInvalid}
            >
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
