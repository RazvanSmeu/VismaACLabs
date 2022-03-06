import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'
import { Subject } from '../../utils/Subject'

export type DbxInputProps = Omit<TextFieldProps, 'value'> & {
  subject: Subject<string>
}

export function DbxDatePicker(props: DbxInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        {...props}
        value={new Date(props.subject.value)}
        onChange={(value) => {
          if (value != null) {
            props.subject.set(value.toISOString().split('T')[0])
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            onChange={(event) => {
              props.subject.set(event.target.value)
            }}
          />
        )}
        // error={props.subject.validation.isInvalid}
        onError={() => {
          // do nothing
        }}
        // helperText={props.subject.validation.message}
      />
    </LocalizationProvider>
  )
}
