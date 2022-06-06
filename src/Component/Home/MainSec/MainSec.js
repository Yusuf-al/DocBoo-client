import React, { useEffect, useState } from "react";
import Spinner from "../../Spinner/Spinner";
import MainCard from "../MainCard";
import "./MainSec.css";

const MainSec = () => {
  const [doctorInfo, setDoctorInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5080/api/v1/doctor", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("acc-token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDoctorInfo(data);
        setLoading(false);
      });
  }, []);

  console.log(doctorInfo);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <div className="middle-section">
        {doctorInfo.map((info) => (
          <MainCard key={info.id} info={info}></MainCard>
        ))}
      </div>
    </>
  );
};

export default MainSec;
