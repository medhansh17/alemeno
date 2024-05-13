import { Navigate, Outlet } from "react-router-dom";
import { User } from "../state/user/userSlice";

export const ProtectedRoute = () => {
  const user: User = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  return user ? <Outlet /> : <Navigate to="/login" />;
};
