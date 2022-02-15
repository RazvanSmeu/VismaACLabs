import React from "react";
import "./DoubleTexAppBar.css";
import AppBar from '@mui/material/AppBar';
import { IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box } from "@mui/system";
import { Search } from "@mui/icons-material";

export function DoubleTexAppBar() {
	return (
		<AppBar position="sticky" className="DoubleTexAppBar">
			<Toolbar>
				<IconButton color="inherit" sx={{mr: 2}}>
					<MenuIcon/>
				</IconButton>
				<Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            DoubleTex
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<IconButton color="inherit">
					<PersonIcon/>
				</IconButton>
				<IconButton color="inherit">
					<GroupIcon/>
				</IconButton>
				<IconButton color="inherit">
					<LocalOfferIcon/>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}