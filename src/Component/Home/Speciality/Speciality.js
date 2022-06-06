import React from "react";
import "./Speciality.css";

const Speciality = () => {
  return (
    <div className="left-card left-card-1">
      <h4 className="text-lg text-center uppercase mb-2">Category</h4>
      <div className="check-box box-1">
        <div className="flex items-center">
          <input type="checkbox" name="" id="1" />
          <label className="ml-2" htmlFor="1">
            Spacilality 1
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="" id="2" />
          <label className="ml-2" htmlFor="2">
            Spacilality 2
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="" id="3" />
          <label className="ml-2" htmlFor="3">
            Spacilality 3
          </label>
        </div>
      </div>
    </div>
  );
};

export default Speciality;
