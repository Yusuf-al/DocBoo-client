import React from "react";
import { Link } from "react-router-dom";

const MainCard = (props) => {
  const {
    name,
    gander,
    phoneNum,
    profileImg,
    specialties,
    slug,
    userDel,
    currentPosition,
    tobTitle,
    workdPlace,
  } = props.info;
  return (
    <div className="user-card">
      <div className="user-img">
        <img src={profileImg} alt="" />
      </div>
      <div className="user-info">
        <h3>Dr {name}</h3>
        <h4>{tobTitle}</h4>
        <div className="degree-info">
          <p>{currentPosition}</p>
          <p>{workdPlace}</p>
          <div className="contact-info">
            <i className="far fa-envelope-open"></i>
            <p>{userDel?.email}</p>
          </div>
          <div className="contact-info">
            <i className="fas fa-mobile-alt"></i>
            <p>{phoneNum}</p>
          </div>
          <div className="contact-info">
            {gander === "Male" ? (
              <i className="fas fa-male"></i>
            ) : (
              <i className="fas fa-female"></i>
            )}
            <p>{gander}</p>
          </div>
          <div className="speciality">
            <h4>Speciality</h4>
            <div>
              {specialties.map((specialty, ind) => (
                <p key={ind}>{specialty}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="visit-profile-btn">
          <div className="like-icon">
            <i className="far fa-heart"></i>
            <p>15</p>
          </div>
          <div className="profile-link-btn">
            <Link to={`/doctor/${slug}`}>Visit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
