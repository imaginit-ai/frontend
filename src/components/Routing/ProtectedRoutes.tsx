import { SiteScreens } from "@/types";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const isAuthenticated = true; // TODO: Implement authentication

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to={SiteScreens.AUTH}
      state={{ from: window.location.pathname }}
    />
  );
};
