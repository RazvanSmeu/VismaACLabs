import { Button, Modal } from "@mui/material";
import React from "react";
import './ErrorPopup.css';
import { DbxPanel } from "./DbxPanel";

export type ErrorPopupProps = {
	message: string;
	close(): void;
}

export function ErrorPopup(props: ErrorPopupProps) {
	return (
		<div className="error-popup__backdrop">
			<DbxPanel className="error-popup__panel">
				<span>{ props.message }</span>
				<div className="error-popup__footer">
					<Button variant="contained" onClick={props.close}>
						Ok
					</Button>
				</div>
			</DbxPanel>
		</div>
	)
}