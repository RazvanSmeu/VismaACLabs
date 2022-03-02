import React from "react";
import "./DoubleTexAppBar.css";
import AppBar from '@mui/material/AppBar';
import {Button, Toolbar, Typography} from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box } from "@mui/system";
import {AccountBox, Inventory, Logout, Work} from "@mui/icons-material";

function redirect(path: string) {
	return () => window.location.href = path;
}

export function DoubleTexAppBar() {
	return (
		<AppBar position="sticky" className="DoubleTexAppBar">
			<Toolbar>
				<Typography
					variant="h4"
					noWrap
					component="div"
					sx={{ display: { xs: 'none', sm: 'block' }, cursor: "pointer" }}
					onClick={redirect("/")}
				  >
					DoubleTex
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<Button startIcon={<GroupIcon />} disableElevation variant="contained" onClick={redirect("/employees")}>Employees</Button>
				<Button startIcon={<LocalOfferIcon />} disableElevation variant="contained" onClick={redirect("/products")}>Products</Button>
				<Button startIcon={<Inventory />} disableElevation variant="contained" onClick={redirect("/inventory")}>Inventory</Button>
				<Button startIcon={<Work />} disableElevation variant="contained" onClick={redirect("/company")}>Company</Button>
				<Box width={30} />
				<Button startIcon={<Logout />} disableElevation variant="contained" onClick={() => {
					localStorage.removeItem("doubletex-app-user");
					window.dispatchEvent(new Event("storage"));
				}}>Logout</Button>
			</Toolbar>
		</AppBar>
	);
}