import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { DbxInput } from "../../components/DbxInput";
import { DbxPanel } from "../../components/DbxPanel";
import { ErrorPopup } from "../../components/ErrorPopup";
import { Subject, useSubject } from "../../utils/Subject";
import { Invalid, Valid, Validation } from "../../utils/Validated";
import './LoginPage.css';

export type LoginPageProps = {
	doLogin(userName: string, password: string): void,
	goToRegister(): void,
	totalValidation: Subject<Validation>
}

function validateUserName(userName: string): Validation {
	if(userName.length < 3) {
		return Invalid.because("Need at least 4 characters");
	}
	return Valid;
}

function validatePassword(password: string): Validation {
	if(password.length < 7) {
		return Invalid.because("Need at least 8 characters");
	}
	return Valid;
}

export function LoginPage(props: LoginPageProps) {
	const userName = useSubject("", validateUserName);
	const password = useSubject("", validatePassword);

	if(props.totalValidation.value.isInvalid) {
		return <ErrorPopup
			message={props.totalValidation.value.message}
			close={() => props.totalValidation.set(Valid)}
			/>;
	}

	const canContinue = (
		userName.validation == Valid &&
		password.validation == Valid
	)

	return (
		<DbxPanel className="login-page__wrapper">
			<h1 className="login-page__header">Login</h1>
			<DbxInput 
				id="username"
				label="Username"
				type="text"
				autoComplete="username"
				subject={userName}
			/>
			<DbxInput
				id="outlined-password-input"
				label="Password"
				type="password"
				autoComplete="password"
				subject={password}
			/>
			<div className="login-page__footer">
				<Button
					variant="contained"
					disabled={!canContinue}
					onClick={() => props.doLogin(userName.value, password.value)}
				>
					Login
				</Button>
				<Button
					variant="contained"
					disabled={!canContinue}
				>
					Register
				</Button>
			</div>
		</DbxPanel>
	);
}