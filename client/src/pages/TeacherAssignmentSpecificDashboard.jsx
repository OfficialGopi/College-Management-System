import {
	Assessment,
	Assignment,
	Close,
	DownloadForOfflineOutlined,
	OfflineBolt,
	Pause,
	StartOutlined,
	StartRounded,
	Stop,
	StopCircle,
	StopCircleOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";

const TeacherAssignmentSpecificDashboard = () => {
	return (
		<div className="w-full gap-2 flex h-full flex-col">
			<div className="w-full  items-center gap-4  p-4 flex  text-white rounded-xl  bg-black">
				<Assessment fontSize="large" />
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl">Title : Hello World</h1>
					<span className="text-xl">Description : Hello World</span>
					<span>Due Date : 30-03-2004</span>
				</div>
				<IconButton
					sx={{
						color: "white",
					}}
				>
					<StartRounded />
				</IconButton>
				<IconButton
					sx={{
						color: "white",
					}}
				>
					<Pause />
				</IconButton>
				<IconButton
					sx={{
						color: "white",
					}}
				>
					<StopCircleOutlined />
				</IconButton>
			</div>
			<div className="w-full flex gap-2 flex-col flex-1 overflow-y-scroll   rounded-lg p-2">
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
				<StudentAssignmentSubmits />
			</div>
		</div>
	);
};

const StudentAssignmentSubmits = () => {
	return (
		<div className="w-full  bg-opacity-80 gap-4 p-2 items-center text-black bg-slate-300 border-2 rounded-xl flex">
			<Assignment fontSize="large" />
			<div className="flex flex-col">
				<span className="text-2xl font-semibold">
					Name: Gopikanta Mondal
				</span>
				<span className="text-xl font-semibold">Roll: 11200122034</span>
				<span className="text-lg">Batch : batch2022</span>
			</div>
			<div className="flex-1"></div>
			<IconButton>
				<DownloadForOfflineOutlined />
			</IconButton>
		</div>
	);
};

export default TeacherAssignmentSpecificDashboard;
