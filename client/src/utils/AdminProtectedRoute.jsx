import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
  const user = useSelector((state) => state.auth.value);
  if (user && user.role === "admin") {
    return <Outlet />;
  } else if (user && user.role != "admin") {
    return <Navigate to={"/in/" + user.role} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminProtectedRoute;
