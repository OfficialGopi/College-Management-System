import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminOutletPage = () => {
  return (
    <main className="h-screen w-screen ">
      <nav className="h-[64px]">
        <AdminNavbar />
      </nav>
      <main className="h-[calc(100vh-60px)] w-full flex overflow-hidden">
        <div className="w-[350px] h-full hidden md:block">
          <AdminSidebar />
        </div>
        <div className="h-full w-full md:w-[calc(100%-350px)] border p-4 overflow-x-hidden overflow-y-scroll">
          <Outlet />
        </div>
      </main>
    </main>
  );
};

export default AdminOutletPage;
