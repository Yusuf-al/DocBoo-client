import React, { useRef } from "react";

const EducationInfo = ({ academicdata, setAcademicData }) => {
  const doc10school = useRef("");
  const doc10year = useRef("");
  const doc10per = useRef("");
  const docCollName = useRef("");
  const docCollPer = useRef("");
  const docCollYear = useRef("");
  const mbbsColl = useRef("");
  const mbbsPer = useRef("");
  const mbbsYear = useRef("");
  const exName = useRef("");
  const exYear = useRef("");
  const exPer = useRef("");
  const exQua = useRef("");

  const academicInfo = {
    schoolInfo: [
      doc10school.current.focus(),
      doc10per.current.focus(),
      doc10year.current.focus(),
    ],
    collegeInfo: [
      docCollName.current.focus(),
      docCollPer.current.focus(),
      docCollYear.current.focus(),
    ],
    mbbsInfo: [
      mbbsColl.current.focus(),
      mbbsPer.current.focus(),
      mbbsYear.current.focus(),
    ],
    otherDegInfo: [
      exName.current.focus(),
      exPer.current.focus(),
      exYear.current.focus(),
    ],
    extraQuility: exQua.current.focus(),
  };

  setAcademicData(academicInfo);
  return (
    <>
      <div>
        <h1 className="uppercase text-blue-700 text-xl text-center font-semibold">
          Educational Information
        </h1>
      </div>

      <div>
        <div class="form-grp">
          <label for="name">10th or Equevalent Examination :</label>
          <div class="academic-year">
            <input
              type="text"
              name="doc10school"
              ref={doc10school}
              placeholder="School Name"
              className="input input-bordered rounded-md input-info w-full my-1"
              required
            />
            <input
              type="text"
              name="doc10year"
              ref={doc10year}
              className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
              placeholder="passing year"
              required
            />
            <input
              type="text"
              name="doc10per"
              ref={doc10per}
              placeholder="Parcentage"
              className="input input-bordered rounded-md input-info w-50 my-1"
              required
            />
          </div>
        </div>
        <div class="form-grp">
          <label for="name">12th or Equevalent Examination :</label>
          <div class="academic-year">
            <input
              type="text"
              name="docCollName"
              ref={docCollName}
              placeholder="College Name"
              className="input input-bordered rounded-md input-info w-full my-1"
              required
            />
            <input
              type="text"
              name="docCollYear"
              ref={docCollYear}
              className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
              placeholder="passing year"
              required
            />
            <input
              type="text"
              name="docCollPer"
              ref={docCollPer}
              placeholder="Parcentage"
              className="input input-bordered rounded-md input-info w-50 my-1"
              required
            />
          </div>
        </div>
        <div class="form-grp">
          <label for="name">MBBS or Equevalent Examination :</label>
          <div class="academic-year">
            <input
              type="text"
              name="mbbsColl"
              ref={mbbsColl}
              placeholder="MBBS Institution Name"
              className="input input-bordered rounded-md input-info w-full my-1"
              required
            />
            <input
              type="text"
              name="mbbsYear"
              ref={mbbsYear}
              className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
              placeholder="Passing year"
              required
            />
            <input
              type="text"
              name="mbbsPer"
              ref={mbbsPer}
              placeholder="Parcentage"
              className="input input-bordered rounded-md input-info w-50 my-1"
              required
            />
          </div>
        </div>
        <div class="form-grp">
          <label for="name">Other Degree (if any) :</label>
          <div class="academic-year">
            <input
              type="text"
              name="exName"
              ref={exName}
              placeholder="College Name"
              className="input input-bordered rounded-md input-info w-full my-1"
              required
            />
            <input
              type="text"
              name="exYear"
              ref={exYear}
              className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
              placeholder="passing year"
              required
            />
            <input
              type="text"
              name="exPer"
              ref={exPer}
              placeholder="Parcentage"
              className="input input-bordered rounded-md input-info w-50 my-1"
              required
            />
          </div>
        </div>
        <div className="form-grp">
          <label htmlFor="health-issue">Extra Qualification : </label>
          <textarea
            name="exQua"
            ref={exQua}
            id="health-issue"
            cols="30"
            rows="10"
            className="textarea rounded-md textarea-info"
            required
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default EducationInfo;
