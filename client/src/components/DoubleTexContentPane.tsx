import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {EmployeeListPage} from "../pages/EmployeeList/EmployeeListPage";
import "./DoubleTexContentPane.css";

export type DoubleTexContentPaneProps = {
    children: React.ReactNode;
}

export function DoubleTextContentPane(props: DoubleTexContentPaneProps) {
    return (
        <div className='doubleTex__contentPane'>
            <BrowserRouter>
                <div>
                    <Routes>
                        {props.children}
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}