import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PATHS } from "../constants";

export const ProtectedRoute = () => {
  const { isUserLoggedIn } = useAuth();
  if (!isUserLoggedIn) return <Navigate to={PATHS.login} />;
  return <Outlet />;
};
