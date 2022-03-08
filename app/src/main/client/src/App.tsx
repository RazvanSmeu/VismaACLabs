import React from 'react'
import './App.css'
import { GlobalErrorPopup } from './components/ErrorPopup'
import './dbx-globals.css'
import AppFrame from './pages/AppFrame/AppFrame'
import { LoginPage } from './pages/Login/LoginPage'
import { useLoginPage } from './pages/Login/useLoginPage'
import { USER_SESSION } from './types/User'

function App() {
  const userSubject = USER_SESSION.useSpec()
  const loginPageProps = useLoginPage()

  let page: React.ReactNode
  if (userSubject.value !== undefined) {
    page = <AppFrame />
  } else {
    page = <LoginPage {...loginPageProps} />
  }

  return (
    <>
      <GlobalErrorPopup />
      {page}
    </>
  )
}

export default App
