import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const RoutAuth = ({ children, role }) => {
  const [user] = useAuth();
  const navigate = useNavigate();

  if (user.message === "Forbidden access") {
    navigate("/login");
  }
  if (user && user.role === role) {
    return children;
  } else {
    return "Access Denied";
  }
};

export default RoutAuth;
