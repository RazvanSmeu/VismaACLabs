import { TextField, TextFieldProps } from '@mui/material'
import React, { ChangeEventHandler, useState } from 'react'
import { Subject } from '../../utils/Subject'

export type DbxInputProps = Omit<TextFieldProps, 'value'> & {
  subject: Subject<string | number>
  onChange?: ChangeEventHandler
}

export function DbxInput(props: DbxInputProps) {
  const [isBlank, setIsBlank] = useState(props.subject.value === '')
  let value = props.subject.value
  if (props.type === 'number') {
    if (isBlank) {
      value = ''
    } else {
      value = +value
    }
  }

  function setValue(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let newValue: string | number = event.target.value
    if (props.type === 'number') {
      if (newValue === '') {
        setIsBlank(true)
        newValue = 0
      } else {
        newValue = +newValue
        setIsBlank(false)
      }
    }
    props.subject.set(newValue)
    if (props.onChange != null) {
      props.onChange(event)
    }
  }

  return (
    <TextField
      className='dbx-input'
      {...props}
      value={value}
      onChange={setValue}
      error={props.subject.validation.isInvalid}
      helperText={
        props.subject.validation.messages.length > 0 ? props.subject.validation.messages[0] : ''
      }
    />
  )
}
