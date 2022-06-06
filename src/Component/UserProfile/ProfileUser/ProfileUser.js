import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../Spinner/Spinner";
import ProfileData from "../ProfileData/ProfileData";
import UserAppoinment from "../UserAppointment/UserAppoinment";
import UserNav from "../UserNav/UserNav";

const ProfileUser = () => {
  const [userData, setUserData] = useState({});
  const [user, loading] = useAuth();

  useEffect(() => {
    setUserData(user);
  }, [user]);
  console.log(userData);
  if (loading) {
    return <Spinner></Spinner>;
  }

  const appointmentList = userData?.patientInfo?.[0]?.myAppoinments;

  return (
    <div className="my-container doc-main-profile">
      <div>
        <UserNav info={userData?.patientInfo?.[0]}></UserNav>
      </div>
      <div>
        <Routes>
          <Route
            path="/"
            element={<ProfileData userData={user}></ProfileData>}
          ></Route>
          <Route
            path="appointments"
            element={
              <UserAppoinment
                appointmentList={appointmentList}
                loading={loading}
              ></UserAppoinment>
            }
          ></Route>
        </Routes>
      </div>
    </div>
  );
};

export default ProfileUser;
