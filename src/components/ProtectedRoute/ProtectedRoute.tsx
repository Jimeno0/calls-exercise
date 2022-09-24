import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "hooks";
import { PATHS } from "constants/index";

export const ProtectedRoute = () => {
  const { isUserLoggedIn } = useAuth();
  if (!isUserLoggedIn) return <Navigate to={PATHS.login} />;
  return <Outlet />;
};
