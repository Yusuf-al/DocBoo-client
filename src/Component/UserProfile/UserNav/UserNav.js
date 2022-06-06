import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNav = ({ info }) => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("acc-token");
    navigate("/login");
  };
  return (
    <section className="doc-main-left">
      <div className="doc-photo">
        <img src={info?.userPhoto} alt="" />
      </div>
      <div className="doc-gen-info">
        <h3 className="text-center uppercase text-md mt-3">{info?.name}</h3>
        <div className="doc-gen-div">
          <h5 className="text-center text-sm mt-2">{info?.tobTitle}</h5>
          <h5 className="text-center text-sm mt-1">{info?.workdPlace}</h5>
        </div>
      </div>
      <div className="profileW-list">
        <Link to="/user-profile">
          <i className="fas fa-user-md icn"></i>My Profile
        </Link>
        <Link to="/">
          <i className="fas fa-home icn"></i>Back to Homa
        </Link>

        <Link to="appointments">
          <i className="fas fa-users icn"></i>My Appoinments
        </Link>
        <a onClick={logOut}>
          <i className="fas fa-sign-out-alt icn"></i> Log out
        </a>
      </div>
    </section>
  );
};

export default UserNav;
