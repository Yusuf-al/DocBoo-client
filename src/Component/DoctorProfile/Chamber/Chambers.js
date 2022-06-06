import React, { useState } from "react";
import { toast } from "react-toastify";
import PopupModal from "../../PopupModal/PopupModal";
import Spinner from "../../Spinner/Spinner";
import "./Chambers.css";

const Chambers = ({ chamberList, loading }) => {
  const [popup, setPopup] = useState(false);

  const [allChamber, setAllChamber] = useState(chamberList);

  console.log(allChamber);
  const [chamberName, setChamberName] = useState("");
  const [chamberId, setChamberId] = useState("");

  const removeSingleItem = () => {
    const url = `http://localhost:5080/api/v1/chamber/${chamberId}`;

    fetch(url, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        const remainChamber = chamberList.filter(
          (item) => item._id !== chamberId
        );
        console.log(data);
        setAllChamber(remainChamber);
        toast("Item deleted");
        setPopup(false);
      });
  };

  return (
    <section className="sec-com" id="chamber-list">
      <h2 className="top-title">Chamber List</h2>
      <div className="wrap-table100">
        <div className="table100">
          <table>
            <thead>
              <tr className="table100-head">
                <th className="column1">Serial No</th>
                <th className="column2">Chamber Name</th>
                <th className="column3">Contact No</th>
                <th className="column4">Address</th>
                <th className="column5">Limit</th>
                <th className="column6">Action</th>
              </tr>
            </thead>

            {loading ? (
              <Spinner></Spinner>
            ) : (
              <>
                <tbody>
                  {allChamber?.map((data, ind) => (
                    <tr key={data._id}>
                      <td className="column1">{ind + 1}</td>
                      <td className="column2"> {data.chamberName}</td>
                      <td className="column3"> {data.contactNumber}</td>
                      <td className="column4"> {data.address}</td>
                      <td className="column5"> {data.dailyLimit}</td>
                      <td className="column6" style={{ display: "flex" }}>
                        <i
                          className="far fa-trash-alt"
                          onClick={() => {
                            setPopup(true);
                            setChamberName(data.chamberName);
                            setChamberId(data._id);
                          }}
                        ></i>{" "}
                        <i
                          className="far fa-edit"
                          onClick={() => {
                            console.log("Edit data");
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
          message={`You want to delete ${chamberName} from your list?`}
        ></PopupModal>
      )}
    </section>
  );
};

export default Chambers;
