import { Button, Modal, Table, TableBody, TableCell, TableRow } from '@mui/material'
import React, { ChangeEvent, useEffect, useState } from 'react'
import './ErrorPopup.css'
import { DbxPanel } from './DbxPanel'
import { Valid, Validation } from '../utils/Validated'
import { useTimeValidation } from '@mui/lab/internal/pickers/hooks/useValidation'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component'

export type ErrorPopupProps = {
  children: React.ReactNode
  close?(): void
}

export function ErrorPopup(props: ErrorPopupProps) {
  return (
    <div className='error-popup__backdrop'>
      <DbxPanel className='error-popup__panel'>
        <span>{props.children}</span>
        <div className='error-popup__footer'>
          <Button variant='contained' onClick={props.close}>
            Ok
          </Button>
        </div>
      </DbxPanel>
    </div>
  )
}

export function GlobalErrorPopup() {
  const [validation, setValidation] = useState<Validation>(Valid)
  useEffect(() => {
    window.addEventListener('errorPopup', ((event: CustomEvent & { validation: Validation }) => {
      setValidation(event.validation)
    }) as EventListener)

    window.addEventListener('unhandledrejection', function (event) {
      if (
        event != undefined &&
        event.reason != undefined &&
        'invalid' in event.reason &&
        event.reason.invalid
      ) {
        // showErrorPopup(event.reason as Validation)
        const validation = event.reason as Validation
        console.log(validation)
        Store.addNotification({
          title: 'Validation Error',
          message: validation.message,
          type: 'danger',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        })
      }
    })
  }, [])
  return (
    <>
      {validation !== Valid && (
        <ErrorPopup close={() => setValidation(Valid)}>
          <strong>{validation.message}</strong>
          <Table>
            <TableBody>
              {validation.fields.map((f) => {
                return (
                  <TableRow key={f.message}>
                    <TableCell>{f.name}</TableCell>
                    <TableCell>{f.message}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </ErrorPopup>
      )}
    </>
  )
}

export function showErrorPopup(validation: Validation) {
  const event = new CustomEvent('errorPopup')
  const sneakyEvent: any = event
  sneakyEvent['validation'] = validation
  window.dispatchEvent(event)
}
