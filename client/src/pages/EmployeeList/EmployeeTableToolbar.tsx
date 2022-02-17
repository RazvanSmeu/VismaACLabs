import React from "react";
import {Employee} from "../../types/Employee";
import {DataBook} from "../../utils/DataBook";
import "./EmployeeTableToolbar.css";
import {IconButton, Input} from "@mui/material";
import {ArrowLeft, ArrowRight, SwipeLeftAlt, SwipeRight, SwipeRightAlt} from "@mui/icons-material";

export type EmployeeTableToolbarProps = {
    employeesBook: DataBook<Employee>
}

export function EmployeeTableToolbar({employeesBook}: EmployeeTableToolbarProps) {
    return (
        <div className="employeeTable__toolbar">
            <IconButton onClick={() => employeesBook.setPageNumber(employeesBook.pageNumber - 1)}>
                <ArrowLeft/>
            </IconButton>
            <Input
                type="number"
                value={employeesBook.pageNumber}
                onChange={(event) =>
                    employeesBook.setPageNumber(+event.target.value ?? 0)
                }
                className={"employeeTable__toolbar__page-number"}
            />
            <IconButton onClick={() => employeesBook.setPageNumber(employeesBook.pageNumber + 1)}>
                <ArrowRight/>
            </IconButton>
        </div>
    );
}