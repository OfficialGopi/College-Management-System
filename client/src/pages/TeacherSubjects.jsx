import { Avatar } from "@mui/material";

const subjects = [
	{
		subjectName: "Mathematics",
		subjectCode: "MATH101",
		teacherName: "John Doe",
		teacherAvatar: "path/to/avatar1.jpg",
		semester: 4,
		department: "CSE",
	},
	{
		subjectName: "Science",
		subjectCode: "SCI102",
		teacherName: "Jane Smith",
		teacherAvatar: "path/to/avatar2.jpg",
		semester: 4,
		department: "CSE",
	},

	// Add more subjects as needed
];

const TeacherSubjects = () => {
	return (
		<div className="flex h-full ">
			{/* Main Content */}
			<div className="flex-1 p-6">
				<h1 className="text-3xl font-bold mb-4">Subjects</h1>
				<div className="flex flex-wrap justify-start gap-4 mx-auto">
					{subjects.map((subject, index) => (
						<SubjectCard
							subjectName={subject.subjectName}
							subjectCode={subject.subjectCode}
							semester={subject.semester}
							department={subject.department}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

const SubjectCard = ({ subjectName, subjectCode, semester, department }) => {
	return (
		<card className="sm:w-96 w-1/2 sm:h-48 h-32 bg-gradient-to-b from-black via-black to-gray-700 rounded-3xl flex items-center p-4 transition-transform transform hover:scale-105">
			<div className="flex-1">
				<h2 className="text-xl font-bold text-white">{subjectName}</h2>
				<p className="text-lg text-gray-300">Semester: {semester}</p>
				<p className="text-lg text-gray-300">
					Department: {department}
				</p>
			</div>

			<Avatar
				sx={{
					width: "120px",
					height: "120px",
				}}
			/>
		</card>
	);
};

export default TeacherSubjects;
