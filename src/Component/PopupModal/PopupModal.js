import React from "react";
import "./PopupModal.css";

const PopupModal = ({ clsBtn, itemRemove, message }) => {
  return (
    <div>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                clsBtn(false);
              }}
            >
              X
            </button>
          </div>
          <div className="title">
            <h1 className="text-2xl uppercase">{message}</h1>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                clsBtn(false);
              }}
              id="cancelBtn"
            >
              No
            </button>
            <button onClick={itemRemove}>Yes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupModal;
