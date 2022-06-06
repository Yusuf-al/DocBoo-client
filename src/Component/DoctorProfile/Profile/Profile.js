import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../Spinner/Spinner";
import AddChamber from "../AddChamber/AddChamber";
import Appoinments from "../Appointments/Appoinments";
import Chambers from "../Chamber/Chambers";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import ProfileNav from "../ProfileNav/ProfileNav";
import "./Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [user, loading] = useAuth();

  useEffect(() => {
    setUserData(user);
  }, [user]);

  if (loading) {
    return <Spinner></Spinner>;
  }

  const chamberList = userData?.userInfo?.[0]?.chambers;
  const appointmentList = userData?.userInfo?.[0]?.myAppoinments;
  return (
    <div className="my-container doc-main-profile">
      <div>
        <ProfileNav info={userData?.userInfo?.[0]}></ProfileNav>
      </div>
      <div>
        <Routes>
          <Route
            path="/"
            element={<PersonalInfo userData={user}></PersonalInfo>}
          ></Route>
          <Route
            path="/chambers"
            element={
              <Chambers chamberList={chamberList} loading={loading}></Chambers>
            }
          ></Route>
          <Route
            path="/appointments"
            element={
              <Appoinments
                appointmentList={appointmentList}
                loading={loading}
              ></Appoinments>
            }
          ></Route>
          <Route
            path="/add-chamber"
            element={<AddChamber></AddChamber>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
