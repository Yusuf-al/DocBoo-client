import React from "react";
import "./Chambers.css";

const Chambers = ({ data, showAppForm, setChamberInfo }) => {
  const {
    chamberName,
    address,
    contactNumber,
    mon,
    tue,
    wed,
    thu,
    sat,
    sun,
    fri,
  } = data;

  const checkTime = (arr) => {
    let visitTime;
    if (arr[2] === "false") {
      visitTime = `${arr[0]}-${arr[1]}`;
      return visitTime;
    } else {
      visitTime = "off-day";
      return visitTime;
    }
  };

  const handlePopUp = () => {
    showAppForm();
    setChamberInfo(data);
    // console.log(data);
  };

  return (
    <div className="chamber dp-container">
      <img
        className="chamber-img"
        src="https://lh5.googleusercontent.com/p/AF1QipOFd-muUAm56Q8iOMwdb4xqY3NiPikKUR7fEcBf=w1080-k-no"
        alt=""
      />
      <div className="chamber-del">
        <div className="chamber-add bg-cyan-500 mt-2 text-white">
          <h3>{chamberName}</h3>
          <p>{address}</p>
          <p>Contact No: {contactNumber}</p>
        </div>
        <p className="text-center text-white uppercase text-sm bg-cyan-500 p-2 my-3 font-medium">
          Visiting timetable
        </p>
        <div className="timing">
          <p>Mon : {checkTime(mon)}</p>
          <p>Tue : {checkTime(tue)}</p>
          <p>Wed : {checkTime(wed)}</p>
          <p>Thu : {checkTime(thu)}</p>
          <p>Fri : {checkTime(fri)}</p>
          <p>Sat : {checkTime(sat)}</p>
          <p>Sun : {checkTime(sun)}</p>
        </div>
      </div>
      <div
        onClick={handlePopUp}
        className="btn rounded-md bg-cyan-500 book-btn"
      >
        <button className="text-sm text-white uppercase font-semibold">
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default Chambers;
