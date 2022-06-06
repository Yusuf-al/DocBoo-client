import React from "react";

const ProfileData = ({ userData }) => {
  const { email, patientInfo } = userData;
  const profileData = patientInfo?.[0];
  return (
    <section className="sec-com" id="profile">
      <div>
        <h3 className="info-title">Personal Information</h3>
        <div className="doc-info-grp doc-per-info">
          <div className="user-info-list">
            <h3>User Full Name</h3>
            <p className="info-text"> {profileData?.name}</p>
            <h3>Date of Birth</h3>
            <p className="info-text"> {profileData?.dob}</p>
            <h3>Gander</h3>
            <p className="info-text"> {profileData?.gender}</p>
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
      </div>
    </section>
  );
};

export default ProfileData;
