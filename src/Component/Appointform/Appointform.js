import React from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import "./Appointform.css";

const Appointform = ({
  showAppForm,
  setChamberInfo,
  chamberInfo,
  docData,
  setAppointForm,
}) => {
  const [user, loading] = useAuth();
  console.log(user?.patientInfo?.[0]._id);
  console.log(chamberInfo);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      patientName: e.target.patientName.value,
      contactNo: e.target.phoneNum.value,
      patientData: user?.patientInfo?.[0]._id,
      date: e.target.appintDate.value,
      healthIssu: e.target.healthIssue.value,
      doctorData: docData.id,
      chamberData: chamberInfo.id,
      address: e.target.patientAddress.value,
    };

    let bookDate = new Date(data.date).toDateString();
    let day = bookDate.split(" ");
    let weekDay = day[0].toLocaleLowerCase();
    console.log(weekDay);

    const checkPhone = parseInt(data.contactNo);
    if (isNaN(checkPhone)) {
      return toast.error("Phone number is not valid");
    }
    if (chamberInfo[weekDay][2] === "off-day") {
      return toast.warning("On this doctor will not be available");
    }
    const checkDate = new Date(data.date).toLocaleDateString("en-CA");
    const today = new Date().toLocaleDateString("en-CA");
    if (today > checkDate) {
      return toast.error("Appointment date can't be past");
    }

    fetch("http://localhost:5080/api/v1/appointment/book-appointment", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    setAppointForm(false);
    toast.success("Appoint Booked successful");
  };
  return (
    <div>
      <div className="modalBackground ">
        <form className="w-full mx-auto" onSubmit={handleSubmit}>
          <div className="modalContainer mx-auto">
            <div className="titleCloseBtn">
              <button onClick={showAppForm}>X</button>
            </div>
            <div>
              <h1 className="uppercase text-blue-700 text-xl text-center font-semibold">
                Book An Appointment
              </h1>
            </div>
            <div className="title">
              <h1 className="uppercase text-blue-700 ">
                {chamberInfo.chamberName}
              </h1>
            </div>
            <div>
              <div className="form-grp">
                <label htmlFor="patient-name">Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  id="patient-name"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Enter name"
                  required
                />
              </div>
              <div className="form-grp">
                <label htmlFor="phone-Num">Contact No:</label>
                <input
                  type="text"
                  name="phoneNum"
                  id="phone-Num"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Phone Number"
                  required
                />
              </div>
              <div className="form-grp">
                <label htmlFor="appoint-date">Date of Appoinment</label>
                <input
                  type="date"
                  name="appintDate"
                  id="appoint-date"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Enter Date"
                  required
                />
              </div>
              <div className="form-grp">
                <label htmlFor="patient-address">Enter Address</label>
                <textarea
                  name="patientAddress"
                  id="patient-address"
                  cols="30"
                  rows="10"
                  className="textarea rounded-md textarea-info"
                ></textarea>
              </div>
              <div className="form-grp">
                <label htmlFor="health-issue">Health Issues</label>
                <textarea
                  name="healthIssue"
                  id="health-issue"
                  cols="30"
                  rows="10"
                  className="textarea rounded-md textarea-info"
                  required
                ></textarea>
              </div>
            </div>
            <div className="footer">
              <button type="submit" className=" btn text-center">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointform;
