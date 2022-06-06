import React, { useState } from "react";
import { toast } from "react-toastify";
import PopupModal from "../../PopupModal/PopupModal";
import Spinner from "../../Spinner/Spinner";

const Appoinments = ({ appointmentList, loading }) => {
  const [popup, setPopup] = useState(false);

  const [allAppint, setAllAppint] = useState(appointmentList);
  const [patientName, setPatientName] = useState("");
  const [appointId, setAppointId] = useState("");

  const chamberId = appointId?.chamberData;
  console.log(chamberId);

  console.log(appointmentList);
  const removeSingleItem = () => {
    const url = `http://localhost:5080/api/v1/appointment/${appointId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const remainChamber = allAppint.filter(
          (item) => item._id !== appointId
        );
        console.log(data);
        setAllAppint(remainChamber);
        toast("Appointment has been canceled");
        setPopup(false);
      });
  };
  return (
    <section className="sec-com" id="chamber-list">
      <h2 className="top-title">All Appointments</h2>
      <div className="wrap-table100">
        <div className="table100">
          <table>
            <thead>
              <tr className="table100-head">
                <th className="column1">Serial No</th>
                <th className="column2">Patient Name</th>
                <th className="column3">Contact No</th>
                <th className="column4">Address</th>
                <th className="column5">Date</th>
                <th className="column6">Chamber</th>
                <th className="column6">Action</th>
              </tr>
            </thead>

            {loading ? (
              <Spinner></Spinner>
            ) : (
              <>
                <tbody>
                  {allAppint?.map((data, ind) => (
                    <tr key={data._id}>
                      <td className="column1">{ind + 1}</td>
                      <td className="column2"> {data.patientName}</td>
                      <td className="column3"> {data.contactNo}</td>
                      <td className="column4"> {data.address}</td>
                      <td className="column5">{data.date}</td>
                      <td className="column6">
                        {data?.chamberData?.chamberName}
                      </td>
                      <td
                        className="column6"
                        style={{
                          display: "flex",
                          paddingRight: "0px",
                          marginLeft: "35px",
                        }}
                      >
                        <i
                          className="far fa-trash-alt"
                          onClick={() => {
                            setPopup(true);
                            setPatientName(data.patientName);
                            setAppointId(data._id);
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            )}
          </table>
        </div>
      </div>
      {popup && (
        <PopupModal
          itemRemove={removeSingleItem}
          clsBtn={setPopup}
          message={`You want to cancel ${patientName}'s Appointment?`}
        ></PopupModal>
      )}
    </section>
  );
};

export default Appoinments;
