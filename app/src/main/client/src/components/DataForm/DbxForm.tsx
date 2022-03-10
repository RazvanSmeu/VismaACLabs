import React from 'react'
import { Button, IconButton } from '@mui/material'
import { DbxDatePicker } from '../Input/DbxDatePicker'
import { DbxInput } from '../Input/DbxInput'
import { Subject } from '../../utils/Subject'
import './DbxForm.css'
import { Close, DoneAll, HourglassBottom } from '@mui/icons-material'
import { Identifiable } from '../../types/Identifiable'

export type DbxFormState = 'IDLE' | 'PROCESSING' | 'SUCCESS' | 'FAILURE'

export type DbxFormProps<T> = {
  subject: Subject<T>
  save(): void
  remove?(): void
  state: DbxFormState
}

export function DbxForm<T extends Identifiable>(
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
            <Button
              variant='contained'
              onClick={props.save}
              disabled={props.subject.validation.invalid}>
              Save
            </Button>
            {props.subject.value.id != 0 && (
              <Button
                variant='text'
                onClick={() => {
                  props.remove?.()
                }}
                disabled={props.subject.validation.invalid}>
                Delete
              </Button>
            )}
            {props.state === 'PROCESSING' && (
              <IconButton>
                <HourglassBottom />
              </IconButton>
            )}
          </div>
        </>
      )}
    </div>
  )
}
