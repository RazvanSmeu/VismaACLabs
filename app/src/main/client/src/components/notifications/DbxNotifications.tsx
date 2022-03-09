import React, { useEffect, useState } from 'react'
import {
  iNotification,
  NOTIFICATION_CONTAINER,
  ReactNotifications,
  Store
} from 'react-notifications-component'
import { Valid, Validation } from '../../utils/Validated'
import 'react-notifications-component/dist/theme.css'
import './DbxNotifications.css'

const config = {
  container: 'bottom-right' as NOTIFICATION_CONTAINER,
  dismiss: {
    duration: 4000
  },
  animationIn: ['animate__animated animate__fadeIn'],
  animationOut: ['animate__animated animated__fadeOut'],
  slidingEnter: {
    duration: 200,
    timingFunction: 'ease-out',
    delay: 0
  },
  slidingExit: {
    duration: 200,
    timingFunction: 'ease-out',
    delay: 0
  }
}

function splitCamelCase(camelCase: string) {
  let result = camelCase.charAt(0).toUpperCase()
  let hadLower = false
  for (let i = 1; i < camelCase.length; i++) {
    const chr = camelCase.charAt(i)
    if (chr === chr.toUpperCase() && hadLower) {
      hadLower = false
      result += ' ' + chr
    }
    if (chr === chr.toLowerCase()) {
      hadLower = true
      result += chr
    }
  }
  return result
}

function validationtoINotification(validation: Validation): iNotification {
  return {
    title: 'Error',
    message: (
      <>
        <strong>{validation.message}</strong>
        <ul>
          {validation.fields.map((f) => (
            <li key={f.message}>
              ({splitCamelCase(f.name)}) {f.message}
            </li>
          ))}
        </ul>
      </>
    ),
    type: 'danger',
    ...config
  }
}

function popupValidationHandler(event: PromiseRejectionEvent) {
  if (
    event != undefined &&
    event.reason != undefined &&
    'invalid' in event.reason &&
    event.reason.invalid
  ) {
    Store.addNotification(validationtoINotification(event.reason as Validation))
  }
}

export function dbxNotify(notification: Omit<iNotification, 'container'>): void {
  Store.addNotification({ ...config, ...notification })
}

export function DbxNotifications() {
  useEffect(() => {
    window.addEventListener('unhandledrejection', popupValidationHandler)

    return () => {
      window.removeEventListener('unhandledrejection', popupValidationHandler)
    }
  })
  return <ReactNotifications />
}
