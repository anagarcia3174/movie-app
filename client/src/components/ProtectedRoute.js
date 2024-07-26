import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";

export const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);

  return user ? children : <Navigate to="/" />;
};
