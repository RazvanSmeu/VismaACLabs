import React from 'react'
import './App.css'
import { GlobalErrorPopup } from './components/ErrorPopup'
import { DbxNotifications } from './components/notifications/DbxNotifications'
import './dbx-globals.css'
import AppFrame from './pages/AppFrame/AppFrame'
import { CompanyWizardPage } from './pages/Login/CompanyWizard/CompanyWizardPage'
import { LoginPage } from './pages/Login/LoginPage'
import { useLoginPage } from './pages/Login/useLoginPage'
import { USER_SESSION } from './types/User'

function App() {
  const userSubject = USER_SESSION.useAsSubject()
  const loginPageProps = useLoginPage()

  let page: React.ReactNode
  if (userSubject.value === undefined) {
    page = <LoginPage {...loginPageProps} />
  } else {
    if (userSubject.value.employee == null) {
      page = <CompanyWizardPage />
    } else {
      page = <AppFrame />
    }
  }

  return (
    <div className='app-container'>
      <DbxNotifications />
      {page}
    </div>
  )
}

export default App
