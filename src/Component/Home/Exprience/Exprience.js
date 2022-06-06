import React from "react";

const Exprience = () => {
  return (
    <div className="left-card left-card-1">
      <h4 className="text-lg text-center uppercase mb-2">Exprience</h4>
      <div className="check-box box-1">
        <div className="flex items-center">
          <input type="checkbox" name="" id="1" />
          <label className="ml-2" htmlFor="1">
            0 yr -5 yr
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="" id="2" />
          <label className="ml-2" htmlFor="2">
            5 yr - 10 yr
          </label>
        </div>
        <div className="flex items-center">
          <input type="checkbox" name="" id="3" />
          <label className="ml-2" htmlFor="3">
            10 yr - 20 yr
          </label>
        </div>
      </div>
    </div>
  );
};

export default Exprience;
