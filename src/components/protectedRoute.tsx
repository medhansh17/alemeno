import { Navigate, Outlet } from "react-router-dom";
import { User } from "../state/user/userSlice";

export const ProtectedRoute = () => {
  const user: User = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") as string)
    : null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};
