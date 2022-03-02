import React from 'react';
import './App.css';
import './dbx-globals.css';
import AppFrame from './pages/AppFrame/AppFrame';
import { LoginPage } from './pages/Login/LoginPage';
import { useLoginPage } from './pages/Login/useLoginPage';
import { User, USER_SESSION } from './types/User';
import { useUnstableSubject } from './utils/Subject';

function App() {
	const userSubject = USER_SESSION.useSpec();
	const loginPageProps = useLoginPage();

	if(userSubject.value !== undefined) {
		return (
			<AppFrame user={userSubject.value}/>
		);
	} else {
		return (
			<LoginPage
				{...loginPageProps}
			/>
		)
	}
}

export default App;
