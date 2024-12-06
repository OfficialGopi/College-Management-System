import { Avatar } from "@mui/material";
import React from "react";

const SubjectCard = ({
	subjectName,
	subjectCode,
	teacherName,
	teacherAvatar,
	credit,
	type,
}) => {
	return (
		<div className="sm:w-96 w-1/2 sm:h-48 h-32 bg-gradient-to-b from-black via-black to-gray-700 rounded-3xl flex items-center p-4 transition-transform transform hover:scale-105">
			<div className="flex-1">
				<h2 className="text-xl font-bold text-white">{subjectName}</h2>
				<p className="text-lg text-gray-300">Code: {subjectCode}</p>
				{teacherName && (
					<p className="text-lg text-gray-300">
						Teacher: {teacherName}
					</p>
				)}
				<p className="text-lg text-gray-300">Credit: {credit}</p>
				<p className="text-lg text-gray-300">Type: {type}</p>
			</div>

			<Avatar
				src={teacherAvatar}
				sx={{
					width: "120px",
					height: "120px",
				}}
			/>
		</div>
	);
};

export default SubjectCard;
