import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRouter = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = useAuth();

  if (isLoggedIn) {
    // console.log(auth.user);
    return auth.user.role === "student" ? children : <Navigate to="/" />;
  }

  return <Navigate to="/" />;

  return isLoggedIn ? children : <Navigate to="/" />;
};

export default PrivateRouter;
