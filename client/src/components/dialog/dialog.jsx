import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import React from "react";

const dialog = () => {
	const handleLogoutDialogOpen = () => {
		const [dialogOpen, setDialogOpen] = useState(false);

		setDialogOpen(true);
		handleMenuClose();
	};

	const handleLogoutDialogClose = () => {
		setLogoutDialogOpen(false);
	};
	return (
		<Dialog open={dialogOpen} onClose={handleDialogClose}>
			<DialogTitle>Logout Confirmation</DialogTitle>
			<DialogContent>
				<p>Are you sure you want to logout?</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleLogoutDialogClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleLogoutConfirm} style={{ color: "red" }}>
					Logout
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default dialog;
