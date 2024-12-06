import { useState } from "react";
import {
	AppBar,
	Toolbar,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import {
	Menu as MenuIcon,
	Close as CloseIcon,
	Home,
	Book,
	Assignment,
	Folder,
	Schedule,
	Grade,
	AccountCircle,
	ExitToApp,
	Feedback,
	Settings,
	Info,
	ContactMail,
} from "@mui/icons-material";
import { GraduationIcon } from "../../assets/icons/GraduationIcon";

function AdminNavbar() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

	const handleAvatarClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const toggleDrawer = (open) => {
		setDrawerOpen(open);
	};

	const handleLogoutDialogOpen = () => {
		setLogoutDialogOpen(true);
		handleMenuClose();
	};

	const handleLogoutDialogClose = () => {
		setLogoutDialogOpen(false);
	};

	const handleLogoutConfirm = () => {
		// Add your logout logic here (e.g., clear tokens, redirect to login)
		console.log("User logged out");
		handleLogoutDialogClose();
	};

	const menuItems = [
		{ text: "Home", link: "", icon: <Home /> },
		{ text: "Subjects", link: "subjects", icon: <Book /> },
		{ text: "Create Teacher", link: "createteacher", icon: <Assignment /> },
		{ text: "Create Batch", link: "createbatch", icon: <Folder /> },
		{ text: "Create Student", link: "createstudent", icon: <Folder /> },
		{ text: "Routine", link: "routine", icon: <Schedule /> },
	];

	const menuItemsSm = [
		...menuItems,

		{ text: "Create Notices", link: "createnotices", icon: <Info /> },
	];
	return (
		<AppBar
			position="static"
			sx={{ backgroundColor: "white", height: "100%" }}
		>
			<Toolbar className="flex justify-between bg-inherit">
				{/* Left Side with Logo */}
				<div className="flex flex-col items-center">
					{/* Logo Placeholder */}
					<div className="text-black font-bold text-lg">
						<GraduationIcon len={"40px"} />
					</div>
				</div>

				{/* Centered Menu */}
				<div className="hidden md:flex justify-center space-x-8 mt-2">
					{menuItems.map((item) => (
						<NavLink
							key={item.text}
							to={item.link}
							className={({ isActive }) =>
								`text-black hover:text-gray-500 transition-colors duration-300 flex flex-col items-center ${
									isActive ? "font-bold text-gray-700" : ""
								}`
							}
						>
							<div className="text-black">{item.icon}</div>
							<span className="text-sm">{item.text}</span>
						</NavLink>
					))}

					<NavLink
						className={`text-black hover:text-gray-500 transition-colors duration-300 flex flex-col items-center`}
						onClick={handleLogoutDialogOpen}
					>
						<div className="text-black">
							<ExitToApp />
						</div>
						<span className="text-sm">Logout</span>
					</NavLink>
				</div>

				{/* Profile Button with Dropdown Menu (Only on Desktop) */}

				{/* Mobile Menu Button */}
				<div className="md:hidden flex items-center">
					<IconButton
						onClick={() => toggleDrawer(true)}
						className="text-black"
					>
						<MenuIcon />
					</IconButton>
					{/* Profile Avatar next to Hamburger */}
					<IconButton onClick={handleAvatarClick} className="ml-2">
						<Avatar className="bg-black text-white" />
					</IconButton>
					<Drawer
						anchor="left"
						open={drawerOpen}
						onClose={() => toggleDrawer(false)}
						PaperProps={{
							className: "bg-white text-black w-64",
						}}
					>
						<div className="flex justify-end p-4">
							<IconButton
								onClick={() => toggleDrawer(false)}
								className="text-black"
							>
								<CloseIcon />
							</IconButton>
						</div>
						<List>
							{menuItemsSm.map((item) => (
								<ListItem
									key={item.text}
									button
									component={NavLink}
									to={item.link}
									onClick={() => toggleDrawer(false)}
									className="text-black hover:text-gray-500 transition-colors duration-300 flex items-center space-x-1"
								>
									<ListItemIcon className="">
										{item.icon}
									</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItem>
							))}
							<ListItem
								button
								onClick={handleLogoutDialogOpen}
								className="hover:text-gray-500 transition-colors duration-300 flex items-center space-x-1"
							>
								<ListItemIcon className="text-black">
									<ExitToApp />
								</ListItemIcon>
								<ListItemText primary="Logout" />
							</ListItem>
						</List>
					</Drawer>
				</div>
			</Toolbar>

			{/* Logout Confirmation Dialog */}
			<Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
				<DialogTitle>Logout Confirmation</DialogTitle>
				<DialogContent>
					<p>Are you sure you want to logout?</p>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleLogoutDialogClose} color="primary">
						Cancel
					</Button>
					<Button
						onClick={handleLogoutConfirm}
						style={{ color: "red" }}
					>
						Logout
					</Button>
				</DialogActions>
			</Dialog>
		</AppBar>
	);
}

export default AdminNavbar;
