import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/student/StudentNavbar";
import StudentSidebar from "../components/student/StudentSidebar";
const OutletPage = () => {
	return (
		<>
			<main className="h-screen w-screen ">
				<nav className="h-[64px]">
					<StudentNavbar />
				</nav>
				<main className="h-[calc(100vh-60px)] w-full flex overflow-hidden">
					<div className="w-[350px] h-full hidden md:block">
						<StudentSidebar />
					</div>
					<div className="h-full w-full md:w-[calc(100%-350px)] border p-4 overflow-x-hidden overflow-y-scroll">
						<Outlet />
					</div>
				</main>
			</main>
		</>
	);
};

export default OutletPage;
