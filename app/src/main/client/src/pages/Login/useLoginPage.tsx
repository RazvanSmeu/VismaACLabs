import { useEffect } from 'react'
import { showErrorPopup } from '../../components/ErrorPopup'
import { LoginRequest, USER_LOGIN, USER_REGISTER, USER_SESSION } from '../../types/User'
import { useSubject, useSubjectField } from '../../utils/Subject'
import { Invalid, Valid, Validation } from '../../utils/Validated'
import { LoginPageProps } from './LoginPage'

export function useLoginPage(): LoginPageProps {
  const requestData = useSubject({
    userName: '',
    password: ''
  })
  const userName = useSubjectField(requestData, 'userName')
  const password = useSubjectField(requestData, 'password')
  const responseValidation = useSubject(Valid)
  const userSubject = USER_SESSION.useAsSubject()

  async function doLogin() {
    try {
      const user = await USER_LOGIN.call(requestData.value)
      userSubject.set(user)
    } catch (e: any) {
      if ('invalid' in e) {
        requestData.setValidation(e as Validation)
      }
      throw e
    }
  }

  async function doRegister() {
    try {
      const user = await USER_REGISTER.call(requestData.value)
      userSubject.set(user)
    } catch (e: any) {
      if ('invalid' in e) {
        requestData.setValidation(e as Validation)
      }
      throw e
    }
  }

  return {
    userName,
    password,
    doLogin,
    doRegister,
    responseValidation
  }
}

export function useTestLoginPage(): LoginPageProps {
  const userName = useSubject('')
  const password = useSubject('')
  const responseValidation = useSubject(Valid)

  function doLogin() {
    responseValidation.set(
      Invalid.because('Login failed, this is a test environment, you stupid lil cunt.')
    )
  }

  return {
    userName,
    password,
    doLogin,
    doRegister() {
      //do nothing
    },
    responseValidation
  }
}
