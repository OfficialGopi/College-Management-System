import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { useAdmin } from "../hooks/sliceSelector";

const AdminProtectedRoute = () => {
  const user = useSelector((state) => state.auth.value);
  const admin = useAdmin();
  if (admin?.isAuthenticated) {
    return <Outlet />;
  } else if (user) {
    return <Navigate to={"/in/" + user.role} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminProtectedRoute;
