import React, { useRef } from "react";

const PersonalInfo = ({ personaldata, setPersonalData }) => {
  const name = useRef("");
  const phoneNum = useRef("");
  const dob = useRef("");
  const gander = useRef("");
  const address = useRef("");
  const socialMedia = useRef("");

  const personalInfo = {
    name: name.current.focus(),
    phoneNum: phoneNum.current.focus(),
    dob: dob.current.focus(),
    gander: gander.current.focus(),
    address: address.current.focus(),
    socialMedia: socialMedia.current.focus(),
  };
  setPersonalData(personalInfo);
  return (
    <>
      <div>
        <h1 className="uppercase text-blue-700 text-xl text-center font-semibold">
          Perosnal Information
        </h1>
      </div>
      <div>
        <div className="form-grp">
          <label htmlFor="name-input">Your Name</label>
          <input
            type="text"
            name="docName"
            id="name-input"
            className="input input-bordered rounded-md input-info w-full"
            placeholder="Enter name"
            ref={name}
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="phone-Num">Contact No:</label>
          <input
            type="text"
            name="phoneNum"
            ref={phoneNum}
            id="phone-Num"
            className="input input-bordered rounded-md input-info w-full"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            name="docDOB"
            ref={dob}
            id="dob"
            className="input input-bordered rounded-md input-info w-full"
            placeholder="Enter Date of birth"
            required
          />
        </div>
        <div className="form-grp">
          <label for="gander">Gander :</label>
          <select
            name="gander"
            id="gander"
            ref={gander}
            className="input input-bordered rounded-md input-info w-full"
          >
            <option selected disabled>
              ---- Select Gander ----
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-grp">
          <label htmlFor="doc-address">Enter Address</label>
          <textarea
            name="docAddress"
            id="doc-address"
            cols="30"
            rows="10"
            ref={address}
            className="textarea rounded-md textarea-info"
          ></textarea>
        </div>
        <div className="form-grp">
          <label htmlFor="health-issue">Social Media Account</label>
          <input
            type="text"
            className="input input-bordered rounded-md input-info w-full"
            ref={socialMedia}
          />
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
