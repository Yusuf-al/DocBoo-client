import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LogPop.css";

const LogPop = ({ userName }) => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("acc-token");
    navigate("/login");
  };

  return (
    <div className="log-in-popup">
      <Link to="/user-profile">Profile</Link>
      <p>{userName}</p>
      <a style={{ cursor: "pointer" }} onClick={logOut}>
        Log out
      </a>
    </div>
  );
};

export default LogPop;
