import React from "react";
import "./TableToolbar.css";
import {Box, IconButton, Input} from "@mui/material";
import {
    ArrowLeft,
    ArrowRight,
    KeyboardArrowLeft, KeyboardArrowRight,
    KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import {AdvancedBookControls, FilteredDataBook} from "../utils/DataBook";
import {Employee} from "../types/Employee";
import {EmployeeListFilters} from "../pages/EmployeeList/EmployeeListPage";
import { Filter } from "../utils/Filter";

export type TableToolbarProps = {
    book: FilteredDataBook<Employee, EmployeeListFilters> & AdvancedBookControls;
}

export function TableToolbar({book}: TableToolbarProps) {
    return (
        <div className="tableToolbar">
            <Input
                onChange={(event) => {
										const query = event.target.value;
										// if(query) {
											book.putFilter(new Filter("ByName", query))
										// } else {
										// 	book.clearFilter("ByName")
										// }
                }}
            />
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={() => book.toFirstPage()}>
                <ArrowLeft/>
            </IconButton>
            <IconButton onClick={() => book.flipBackwards(10)}>
                <KeyboardDoubleArrowLeft/>
            </IconButton>
            <IconButton onClick={() => book.toPreviousPage()}>
                <KeyboardArrowLeft/>
            </IconButton>
            <Input
                type="number"
                value={book.pageNumber}
                onChange={(event) =>
                    book.setPageNumber(+event.target.value ?? 0)
                }
                className={"tableToolbar__page-number"}
            />
            <IconButton onClick={() => book.toNextPage()}>
                <KeyboardArrowRight/>
            </IconButton>
            <IconButton onClick={() => book.flipForward(10)}>
                <KeyboardDoubleArrowRight/>
            </IconButton>
            <IconButton onClick={() => book.toLastPage()}>
                <ArrowRight/>
            </IconButton>
        </div>
    );
}