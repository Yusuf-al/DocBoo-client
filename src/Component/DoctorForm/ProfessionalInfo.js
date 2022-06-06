import React, { useRef, useState } from "react";

const ProfessionalInfo = ({ professionaldata, setProfessionalData }) => {
  const [tags, setTags] = useState([]);
  const currentPosition = useRef("");
  const jobTitle = useRef("");
  const exprience = useRef("");
  const pastHistory = useRef("");
  const workPlace = useRef("");

  const handleTags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const values = e.target.value;
      setTags([...tags, values]);
      e.target.value = "";
    }
  };

  const professionalInfo = {
    workdPlace: workPlace.current.focus(),
    currentPosition: currentPosition.current.focus(),
    pastHistory: pastHistory.current.focus(),
    tobTitle: jobTitle.current.focus(),
    exprience: exprience.current.focus(),
    specialties: [...tags],
  };

  setProfessionalData(professionalInfo);

  console.log(tags);

  return (
    <>
      <div>
        <h1 className="uppercase text-blue-700 text-xl text-center font-semibold">
          Professional Information
        </h1>
      </div>
      <div>
        <div className="form-grp">
          <label htmlFor="current-Position">Current Position</label>
          <input
            type="text"
            name="currentPosition"
            ref={currentPosition}
            id="current-Position"
            className="input input-bordered rounded-md input-info w-full"
            placeholder="Current Position"
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="phone-Num">Your Work place</label>
          <input
            type="text"
            name="WorkPlace"
            ref={workPlace}
            id="WorkPlace"
            className="input input-bordered rounded-md input-info w-full"
            placeholder="Your Work place"
            required
          />
        </div>
        <div className="form-grp">
          <label htmlFor="patient-address">Employment History</label>
          <textarea
            name="employmentHistory"
            ref={pastHistory}
            id="patient-address"
            cols="30"
            rows="10"
            className="textarea rounded-md textarea-info"
          ></textarea>
        </div>
        <div className="form-grp">
          <div className="flex flex-row mt-2">
            <div>
              <label htmlFor="">Exprience</label>
              <input
                type="text"
                className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
                placeholder="Exprience"
                name="exprience"
                ref={exprience}
                required
              />
            </div>
            <div>
              <label htmlFor="">Job Title</label>
              <input
                type="text"
                className="input input-bordered rounded-md input-info w-[270px] my-1"
                placeholder="Job Title"
                name="jobTitle"
                ref={jobTitle}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-grp">
          <label htmlFor="current-Position">Specilites</label>
          <div className="flex">
            {tags.map((tag, ind) => (
              <div key={ind} className="tags-grp">
                <span>{tag}</span>
                <span className="tag-close-btn">&#x2715;</span>
              </div>
            ))}
          </div>
          {tags.length < 4 && (
            <input
              onKeyDown={handleTags}
              type="text"
              className="input input-bordered rounded-md input-info w-full"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProfessionalInfo;
