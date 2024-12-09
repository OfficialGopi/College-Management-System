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
import { Link, NavLink, useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../toolkits/features/user/authSlice";

function StudentNavbar() {
  const auth = useSelector((state) => state.auth.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(logout());
    navigate("/login");
    handleLogoutDialogClose();
  };

  const menuItems = [
    { text: "Home", link: "", icon: <Home /> },
    { text: "Subjects", link: "subjects", icon: <Book /> },
    { text: "Assignments", link: "assignments", icon: <Assignment /> },
    { text: "Materials", link: "materials", icon: <Folder /> },
    { text: "Routine", link: "routine", icon: <Schedule /> },
    { text: "Result", link: "result", icon: <Grade /> },
  ];
  const menuItemsSm = [
    ...menuItems,
    {
      text: "Feedback",
      link: "feedback",
      icon: <Feedback />,
    },
    { text: "Contact", link: "contact", icon: <ContactMail /> },
    { text: "Settings", link: "settings", icon: <Settings /> },
    { text: "About", link: "about", icon: <Info /> },
  ];
  return (
    <AppBar position="static" sx={{ backgroundColor: "white", height: "100%" }}>
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
        </div>

        {/* Profile Button with Dropdown Menu (Only on Desktop) */}
        <div className="hidden md:flex items-center">
          <IconButton onClick={handleAvatarClick}>
            <Avatar className="bg-black text-white" src={auth.avatarUrl} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="mt-8"
            PaperProps={{
              className: "bg-white text-black rounded-md", // Slightly rounded dropdown
            }}
          >
            <MenuItem
              onClick={handleMenuClose}
              component={Link}
              to="profile"
              className="hover:text-gray-500 transition-colors duration-300 flex items-center space-x-1"
            >
              <AccountCircle />
              <span>Profile</span>
            </MenuItem>
            <MenuItem
              onClick={handleLogoutDialogOpen}
              className="hover:text-gray-500 transition-colors duration-300 flex items-center space-x-1"
            >
              <ExitToApp />
              <span>Logout</span>
            </MenuItem>
          </Menu>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <IconButton onClick={() => toggleDrawer(true)} className="text-black">
            <MenuIcon />
          </IconButton>
          {/* Profile Avatar next to Hamburger */}
          <IconButton onClick={handleAvatarClick} className="ml-2">
            <Avatar className="bg-black text-white" src={auth.avatarUrl} />
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
                  <ListItemIcon className="">{item.icon}</ListItemIcon>
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

      <Dialog open={logoutDialogOpen} onClose={handleLogoutDialogClose}>
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
    </AppBar>
  );
}

export default StudentNavbar;
