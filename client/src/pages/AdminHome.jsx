import { GraduationIcon } from "../assets/icons/GraduationIcon";

import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { getTotalStudents, getTotalTeachers } from "../services/getOthers";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement
);

// Data for charts
const Months = [
	"Jan",
	"Feb",
	"Mar",
	"April",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];
const studentsAttendence = {
	labels: Months,
	datasets: [
		{
			label: "Attendence",
			data: [10, 12, 23, 41, 180, 12, 99, 20, 122, 21, 21, 150],
			backgroundColor: ["black"],
		},
		{
			label: "Total Students to be present",
			data: [200, 200, 180, 240, 190, 100, 101, 100, 211, 123, 42, 220],
			backgroundColor: ["red"],
		},
	],
};

const ClassesHeld = {
	labels: Months,
	datasets: [
		{
			label: "Classes Held",
			data: [10, 21, 23, 23, 42, 23, 11, 23, 53, 53, 53, 12],
			backgroundColor: "red",
		},
		{
			label: "Classes to be Held",
			data: [15, 27, 29, 29, 49, 26, 17, 23, 55, 55, 58, 19],
			backgroundColor: "black",
		},
	],
};
const SubjectsPerDept = {
	labels: ["CSE", "IT", "LT"],
	datasets: [
		{
			label: "Subjects",
			data: [34, 28, 33],
			backgroundColor: ["red", "green", "blue"],
			borderColor: ["black"],
		},
	],
};

const AdminHome = () => {
	const [totalStudentsByGender, setTotalStudentsByGender] = useState([
		0, 0, 0,
	]);
	const [totalStudents, setTotalStudents] = useState(0);
	const [totalTeachers, setTotalTeachers] = useState(0);
	const students = {
		labels: totalStudentsByGender,
		datasets: [
			{
				data: totalStudentsByGender,
				backgroundColor: ["#82ca9d", "#ff6347", "blue"],
				borderColor: ["rgba(0,0,0,0)"],
			},
		],
	};
	useEffect(() => {
		getTotalTeachers()
			.then(({ data }) => {
				setTotalTeachers(data.totalTeachers);
			})
			.catch((error) => console.error(error));
		getTotalStudents()
			.then(({ data }) => {
				console.log(data);
				setTotalStudents(data.totalStudents);
				setTotalStudentsByGender([data.male, data.female, data.others]);
			})
			.catch((error) => console.error(error));
	}, []);
	return (
		<>
			<div className="w-full h-full p-4">
				<div className="w-full flex gap-2 p-2 flex-row flex-wrap">
					<CountUser countName={"Students"} count={totalStudents} />
					<CountUser countName={"Teachers"} count={totalTeachers} />
				</div>
				<div className=" p-2  w-[1400px] gap-2 flex flex-col">
					<div className="flex w-full gap-2">
						<div className="w-1/3 border flex flex-col justify-center items-center p-2 rounded-2xl bg-black bg-opacity-15">
							<h1 className="p-2 font-semibold text-2xl">
								Students by Gender
							</h1>
							<Doughnut height={"100%"} data={students} />
						</div>
						<div className=" flex-1 p-2 w-2/3 border flex flex-col justify-center items-center rounded-2xl bg-black bg-opacity-15">
							<h1 className="p-2 font-semibold text-2xl">
								Students attendence
							</h1>
							<Line height={"100%"} data={studentsAttendence} />
						</div>
					</div>
					<div className="w-full gap-2 flex">
						<div className=" border flex flex-col w-2/3 justify-center items-center p-2 rounded-2xl bg-black bg-opacity-15">
							<Notices />
						</div>
						<div className=" border  flex flex-col w-1/3 justify-center items-center p-2 rounded-2xl bg-black bg-opacity-15">
							<h1 className="p-2 font-semibold text-2xl">
								Subjects Per Department
							</h1>
							<Pie width={"100%"} data={SubjectsPerDept} />
						</div>
					</div>
					<div className="  w-full  flex">
						<div className=" border flex flex-col justify-center items-center p-2 flex-1 rounded-2xl bg-black bg-opacity-15">
							<h1 className="p-2 font-semibold text-2xl">
								Classes
							</h1>
							<Bar height={"100%"} data={ClassesHeld} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const CountUser = ({ countName, count }) => {
	return (
		<div className=" flex   w-64 gap-2 p-3 rounded-xl bg-black bg-opacity-15 border  ">
			<div className="bg-black rounded-xl bg-opacity-15 px-2 items-center flex">
				<GraduationIcon len={48} />
			</div>
			<div className="flex flex-col items-center justify-center">
				<span className=" font-bold text-slate-600 text-lg ">
					Total {countName}
				</span>
				<span className="font-bold text-3xl">{count}</span>
			</div>
		</div>
	);
};
const notices = [
	{
		date: "2024-01-21",
		title: "Notice 1",
		details: "sdkihnkiajn sdikhasdl oasnjdalsdhawls iwda",
	},
	{
		date: "2024-01-21",
		title: "Notice 1",
		details: "sdkihnkiajn sdikhasdl oasnjdalsdhawls iwda",
	},
	{
		date: "2024-01-21",
		title: "Notice 1",
		details: "sdkihnkiajn sdikhasdl oasnjdalsdhawls iwda",
	},
	{
		date: "2024-01-21",
		title: "Notice 1",
		details: "sdkihnkiajn sdikhasdl oasnjdalsdhawls iwda",
	},
	{
		date: "2024-02-21",
		title: "Notice 1",
		details: "sdkihnkiajn sdikhasdl oasnjdalsdhawls iwda",
	},
];

const Notices = () => {
	return (
		<>
			<div className="w-full flex p-4 flex-col">
				<h1 className="text-3xl font-bold  flex-col p-2">Notices</h1>
				<div className="flex gap-2 flex-col">
					{notices.slice(0, 3).map((notice, index) => {
						return (
							<span className="bg-slate-900 flex flex-col gap-1 p-2 rounded-xl w-full">
								<span className="text-white text-2xl px-2">
									Title : {notice.title}
								</span>
								<span className="text-white text-lg px-2">
									Details : {notice.details}
								</span>
								<span className="text-white text-base px-2">
									Date : {notice.date}
								</span>
							</span>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default AdminHome;
