import React from 'react'
import { Button } from '@mui/material'
import { DbxInput } from '../../components/Input/DbxInput'
import { DbxPanel } from '../../components/DbxPanel'
import { ErrorPopup } from '../../components/ErrorPopup'
import { Subject, useSubject } from '../../utils/Subject'
import { Invalid, Valid, Validation } from '../../utils/Validated'
import './LoginPanel.css'
import { LoginRequest } from '../../types/User'

export type LoginPanelProps = {
  userName: Subject<string>
  password: Subject<string>
  responseValidation: Subject<Validation>
  doLogin(): void
  doRegister(): void
}

export function LoginPanel(props: LoginPanelProps) {
  const canContinue =
    props.userName.validation == Valid &&
    props.userName.value != '' &&
    props.password.validation == Valid &&
    props.password.value != ''

  return (
    <>
      {props.responseValidation.value.invalid && (
        <ErrorPopup close={() => props.responseValidation.set(Valid)}>
          {props.responseValidation.value.message}
        </ErrorPopup>
      )}
      <DbxPanel className='login-panel__wrapper'>
        <h1 className='login-panel__header'>Welcome to Doubletex</h1>
        <DbxInput
          id='username'
          label='Username'
          type='text'
          autoComplete='username'
          subject={props.userName}
        />
        <DbxInput
          id='outlined-password-input'
          label='Password'
          type='password'
          autoComplete='password'
          subject={props.password}
        />
        <div className='login-panel__footer'>
          <Button variant='contained' disabled={!canContinue} onClick={props.doLogin}>
            Login
          </Button>
          <Button variant='contained' disabled={!canContinue} onClick={props.doRegister}>
            Register
          </Button>
        </div>
      </DbxPanel>
    </>
  )
}
