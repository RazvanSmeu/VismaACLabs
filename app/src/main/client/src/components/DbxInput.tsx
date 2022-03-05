import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { Subject } from '../utils/Subject'

export type DbxInputProps = Omit<TextFieldProps, 'value'> & {
  subject: Subject<string>
}

export function DbxInput(props: DbxInputProps) {
  return (
    <TextField
      {...props}
      value={props.subject.value}
      onChange={(event) => {
        props.subject.set(event.target.value)
      }}
      error={props.subject.validation.isInvalid}
      helperText={props.subject.validation.message}
    />
  )
}
