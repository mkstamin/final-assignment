import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRouter = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const isLoggedIn = useAuth();

  // console.log("auth :", auth);

  if (!isLoggedIn) {
    return children;
    // console.log(auth.user);
  }

  return auth.user.role === "student" ? (
    <Navigate to="/player" />
  ) : (
    <Navigate to="/admin/dashboard" />
  );
};

export default PublicRouter;
