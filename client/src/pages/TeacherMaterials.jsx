import SubjectCardLink from "../components/student/SubjectCardLink";

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

const TeacherMaterials = () => {
	return (
		<div className="w-full flex gap-5 flex-wrap">
			{subjects.map((subject, index) => {
				return (
					<SubjectCardLink
						semester={subject.semester}
						subjectName={subject.subjectName}
						subjectCode={subject.subjectCode}
						department={subject.department}
					/>
				);
			})}
		</div>
	);
};

export default TeacherMaterials;
