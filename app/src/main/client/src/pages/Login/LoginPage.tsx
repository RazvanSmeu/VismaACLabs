import React, { useState } from "react";
import { LoginPanel, LoginPanelProps } from "./LoginPanel";
import './LoginPage.css';

export type LoginPageProps = LoginPanelProps;

export function LoginPage(props: LoginPageProps) {
	return (
		<div className="login-page__backdrop">
			<LoginPanel
				{...props}
			/>
		</div>
	);
}