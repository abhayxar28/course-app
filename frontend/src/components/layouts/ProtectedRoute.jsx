import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../../hooks/user/useSession";

export default function ProtectedRoute({ role: allowedRole }) {
  const { isAuthenticated, role, sessionLoading } = useSession();

  if (sessionLoading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
