import React from "react";
import "./RightSec.css";

const RightSec = () => {
  return (
    <div className="right-section">
      <h1 className="p-4 uppercase text-center custome-width text-white rounded-md block text-lg">
        Latest Covid Update
      </h1>
      <div className="card card-1">
        <h2>New Cases</h2>
        <h1>144,62,323</h1>
      </div>
      <div className="card card-2">
        <h2>Total Cases</h2>
        <h1>2144,12,743</h1>
      </div>
      <div className="card card-3">
        <h2>Total Death</h2>
        <h1>4,12,743</h1>
      </div>
      <div className="card card-4">
        <h2>Total Recover</h2>
        <h1>124,12,743</h1>
      </div>
      <div className="card card-5">
        <h2>Fully Vaccinated</h2>
        <h1>1114,12,743</h1>
      </div>
    </div>
  );
};

export default RightSec;
