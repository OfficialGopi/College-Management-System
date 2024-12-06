import {
	Box,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import {
	Email,
	Language,
	Phone,
	NotificationsRounded,
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
const StudentSidebar = () => {
	return (
		<Box
			sx={{
				width: "100%",
				bgcolor: "white",
				padding: 2,
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				borderRight: "2px solid black",
				overflowY: "auto",
				overflowX: "hidden",
			}}
		>
			<div className="w-full ">
				{/* Add calender here */}
				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					className="w-full overflow-hidden"
				>
					<DateCalendar className="w-full" readOnly />
				</LocalizationProvider>
			</div>
			{/* Bottom Links Section */}
			<div>
				<Divider />
				<List>
					<ListItem
						button="true"
						component={NavLink}
						to="notices"
						sx={{
							color: "black",
							"&:hover": { bgcolor: "rgba(0, 0, 0, 0.08)" },
						}}
					>
						<ListItemIcon sx={{ color: "black" }}>
							<NotificationsRounded />
						</ListItemIcon>
						<ListItemText primary="Notices" />
					</ListItem>
				</List>
				<div className="w-full flex flex-col p-4">
					<span className="flex gap-2 items-center">
						<span className="text-lg text-black">
							<Email />:
						</span>
						<a
							href="mailto:principal@gcelt.gov.com"
							className="text-gray-500 hover:text-gray-800 transition-all"
						>
							principal@gcelt.gov.com
						</a>
					</span>
					<span className="flex gap-2 items-center">
						<span className="text-lg text-black">
							<Language />:
						</span>
						<a
							href="https://gcelt.gov.in/"
							target="_blank"
							className="text-gray-500 hover:text-gray-800 transition-all"
						>
							https://gcelt.gov.in/
						</a>
					</span>
					<span className="flex gap-2 items-center">
						<span className="text-lg text-black">
							<Phone />:
						</span>
						<a
							href="tel:+91 33 23356977"
							className="text-gray-500 hover:text-gray-800 transition-all"
						>
							+91 33 23356977
						</a>
					</span>
				</div>
			</div>
		</Box>
	);
};

export default StudentSidebar;
