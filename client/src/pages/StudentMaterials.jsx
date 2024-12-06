import { useEffect, useState } from "react";
import SubjectCardLink from "../components/student/SubjectCardLink";
import { getSubjectsBySem } from "../services/subjects";
import { useSelector } from "react-redux";

const StudentMaterials = () => {
	const [subjects, setSubjects] = useState([]); // Initialize state for subjects
	const auth = useSelector((state) => state.auth.value);
	useEffect(() => {
		getSubjectsBySem({
			semester: auth.semester,
			department: auth.department,
		}).then((subjects) => {
			setSubjects(subjects.data); // Set the fetched subjects to the state
		});
	}, []);
	return (
		<div className="flex h-full ">
			{/* Main Content */}
			<div className="flex-1 p-6">
				<h1 className="text-3xl font-bold mb-4">Assignments</h1>
				<div className="flex flex-wrap justify-start gap-4 mx-auto">
					{subjects.map((subject, index) => (
						<SubjectCardLink
							key={index}
							subjectName={subject.subjectName}
							subjectCode={subject._id}
							teacherName={subject.teacher.name}
							teacherAvatar={subject.teacher.avatarUrl}
							credit={subject.credit}
							type={subject.type}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default StudentMaterials;
