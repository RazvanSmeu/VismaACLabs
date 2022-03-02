import React from "react";
import { Button } from "@mui/material";
import { DbxInput } from "../../components/DbxInput";
import { DbxPanel } from "../../components/DbxPanel";
import { ErrorPopup } from "../../components/ErrorPopup";
import { Subject, useSubject } from "../../utils/Subject";
import { Invalid, Valid, Validation } from "../../utils/Validated";
import './LoginPanel.css';
import { LoginRequest } from "../../types/User";

function validateUserName(userName: string): Validation {
	if(userName.length == 0) {
		return Valid;
	}
	if(userName.length < 3) {
		return Invalid.because("Need at least 4 characters");
	}
	return Valid;
}

function validatePassword(password: string): Validation {
	if(password.length == 0) {
		return Valid;
	}
	if(password.length < 3) {
		return Invalid.because("Need at least 4 characters");
	}
	return Valid;
}

export type LoginPanelProps = {
	doLogin(request: LoginRequest): void,
	doRegister(request: LoginRequest): void,
	totalValidation: Subject<Validation>
}

export function LoginPanel(props: LoginPanelProps) {
	const userName = useSubject("", validateUserName);
	const password = useSubject("", validatePassword);

	const canContinue = (
		userName.validation == Valid &&
		userName.value != "" &&
		password.validation == Valid &&
		password.value != ""
	)

	return (
		<>
			{props.totalValidation.value.isInvalid && (
				<ErrorPopup
					message={props.totalValidation.value.message}
					close={() => props.totalValidation.set(Valid)}
				/>
			)}
			<DbxPanel className="login-panel__wrapper">
				<h1 className="login-panel__header">Welcome to Doubletex</h1>
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
				<div className="login-panel__footer">
					<Button
						variant="contained"
						disabled={!canContinue}
						onClick={() => props.doLogin({
							userName: userName.value,
							password: password.value
						})}
					>
						Login
					</Button>
					<Button
						variant="contained"
						disabled={!canContinue}
						onClick={() => props.doRegister({
							userName: userName.value,
							password: password.value
						})}
					>
						Register
					</Button>
				</div>
			</DbxPanel>
		</>
	);
}