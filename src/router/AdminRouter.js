import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminRouter = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = useAuth();

  if (isLoggedIn) {
    // console.log(auth.user);
    return auth.user.role === "admin" ? children : <Navigate to="/" />;
  }

  return <Navigate to="/" />;

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default AdminRouter;
