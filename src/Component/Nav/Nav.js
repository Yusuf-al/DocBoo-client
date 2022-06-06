import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotifyCard from "../NotifyCard/NotifyCard";
import LogPop from "../LogInPop/LogPop";
import "./Nav.css";
import SearchBar from "./SearchBar";
import useAuth from "../../hooks/useAuth";

const Nav = () => {
  const [notify, setNotify] = useState(false);
  const [logPop, setLogPop] = useState(false);

  const [user] = useAuth();

  const userName = user?.patientInfo?.[0].name;

  const navigate = useNavigate();
  const toggleNotify = () => {
    setNotify(!notify);
    setLogPop(false);
  };
  const toggleLog = () => {
    setLogPop(!logPop);
    setNotify(false);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div>
      <nav className="my-container nav-container">
        <section className="search" id="search">
          <div onClick={goHome} className="profile-img">
            <img src="" alt="" />
          </div>
          <SearchBar></SearchBar>
        </section>
        <section className="nav-item">
          <i
            id="notifi-popup"
            onClick={toggleNotify}
            className="far fa-bell not-icon icon"
          ></i>
          <div onClick={toggleLog} className="profile-img">
            <img src="" alt="" />
          </div>
        </section>
        {notify ? <NotifyCard></NotifyCard> : ""}
        {logPop ? <LogPop userName={userName}></LogPop> : ""}
      </nav>
    </div>
  );
};

export default Nav;
