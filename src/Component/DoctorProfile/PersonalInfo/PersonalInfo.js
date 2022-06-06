import React from "react";
import { useNavigate } from "react-router-dom";
import "./PersonalInfo.css";

const PersonalInfo = ({ userData }) => {
  const { email, userInfo } = userData;
  const profileData = userInfo?.[0];

  return (
    <section className="sec-com" id="profile">
      <div>
        <h3 className="info-title">Personal Information</h3>
        <div className="doc-info-grp doc-per-info">
          <div className="user-info-list">
            <h3>User Full Name</h3>
            <p className="info-text"> {profileData?.name}</p>
            <h3>Job title</h3>
            <p className="info-text"> {profileData?.tobTitle}</p>
            <h3>Gander</h3>
            <p className="info-text"> {profileData?.gander}</p>
          </div>
          <div className="user-info-list">
            <h3>Email Address</h3>
            <p className="info-text"> {email}</p>
            <h3>Phone Number</h3>
            <p className="info-text"> {profileData?.phoneNum}</p>
            <h3>Parmanent Address</h3>
            <p className="info-text"> {profileData?.address}</p>
          </div>
        </div>
        <h3 className="info-title">Educational Information</h3>
        <div className="doc-info-grp doc-per-info">
          <div className="user-info-list">
            <h3>School Name</h3>
            <p className="info-text"> {profileData?.schoolInfo[0]}</p>
            <h3>College Name</h3>
            <p className="info-text"> {profileData?.collegeInfo[0]}</p>
            <h3>Medical Institution</h3>
            <p className="info-text"> {profileData?.mbbsInfo[0]}</p>
          </div>
          <div className="user-info-list">
            <h3>Pass Out</h3>
            <p className="info-text"> {profileData?.schoolInfo[1]}</p>
            <h3>College Pass Out</h3>
            <p className="info-text"> {profileData?.collegeInfo[1]}</p>
            <h3>Medical Pass out</h3>
            <p className="info-text"> {profileData?.mbbsInfo[1]}</p>
          </div>
        </div>
        <h3 className="info-title">Professional Information</h3>
        <div className="doc-info-grp doc-per-info">
          <div className="user-info-list">
            <h3>Current work Place</h3>
            <p className="info-text"> {profileData?.workdPlace}</p>
            <h3>Experience</h3>
            <p className="info-text"> {profileData?.exprience}</p>
          </div>
          <div className="user-info-list">
            <h3>Past History</h3>
            <p className="info-text"> {profileData?.pastHistory}</p>

            <h3>Speciality</h3>
            <p className="info-text">
              {profileData?.specialties.map((el, ind) => (
                <span key={ind}>{el}</span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
