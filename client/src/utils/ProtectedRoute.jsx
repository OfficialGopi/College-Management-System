import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = ({ auth, portal }) => {
  if (auth) {
    if (portal === auth.role) return <Outlet />;
    else {
      return <Navigate to={`/in/${auth.role}`} />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
