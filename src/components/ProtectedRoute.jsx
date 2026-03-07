import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ adminOnly = false }) => {
  const { userInfo } = useAuthStore();

  // 1. Check if user is logged in
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  // 2. If it's an admin route, check for isAdmin status
  if (adminOnly && !userInfo.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 3. If everything is fine, show the page
  return <Outlet />;
};

export default ProtectedRoute;
