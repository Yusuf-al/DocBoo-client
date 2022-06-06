import React from "react";
import Exprience from "../Exprience/Exprience";
import Speciality from "../Speciality/Speciality";
import "./LeftSec.css";
const LeftSec = () => {
  return (
    <div className="left-pos">
      <div className="fixed top-20 left-20">
        <h1 className="p-4 uppercase text-center custome-width text-white rounded-md block text-lg">
          Filter By
        </h1>
        <Speciality></Speciality>
        <Exprience></Exprience>
      </div>
    </div>
  );
};

export default LeftSec;
