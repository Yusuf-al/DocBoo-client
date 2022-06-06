import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Appointform from "../Appointform/Appointform";
import Chambers from "../Chambers/Chambers";
import Nav from "../Nav/Nav";
import Spinner from "../Spinner/Spinner";
import "./DoctorDetails.css";

const DoctorDetails = () => {
  const slug = useParams();
  const [data, setData] = useState({});
  const [Speciality, setSpeciality] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chamber, setChamber] = useState([]);

  const [chamberInfo, setChamberInfo] = useState(null);

  const [appointForm, setAppointForm] = useState(false);

  const showAppointForm = () => {
    setAppointForm(!appointForm);
  };

  const dataFetch = async () => {
    setLoading(true);
    const url = `http://localhost:5080/api/v1/doctor/${slug.slug}`;
    let data = await fetch(url);
    data = await data.json();
    setData(data);
    setSpeciality(data.specialties);
    setLoading(false);
    // console.log(data.chambers);
    setChamber(data?.chambers);
  };

  useEffect(() => {
    dataFetch();
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }

  const {
    name,
    gander,
    phoneNum,
    profileImg,
    userDel,
    currentPosition,
    tobTitle,
    workdPlace,
    extraQuility,
    pastHistory,
  } = data;

  return (
    <>
      <Nav></Nav>
      <section className="my-container">
        <div className="intro-section-dp dp-container">
          <div className="profile-img-dp">
            <img src={profileImg} alt="" />
          </div>
          <div className="profile-info-dp">
            <h3>Dr {name}</h3>
            <h4>{tobTitle}</h4>
            <div className="profession-info-dp">
              <p>{currentPosition}</p>
              <p>{workdPlace}</p>
              <div className="email-dp">
                <i className="far fa-envelope-open"></i>
                <p>{userDel?.email}</p>
              </div>
              <div className="mobile-dp">
                <i className="fas fa-mobile-alt"></i>
                <p className="numbers">{phoneNum}</p>
              </div>
              <div className="gender-xp-dp">
                <p>
                  {gander === "Male" ? (
                    <i
                      className="fas fa-male"
                      style={{ marginRight: "5px" }}
                    ></i>
                  ) : (
                    <i
                      className="fas fa-female"
                      style={{ marginRight: "5px" }}
                    ></i>
                  )}{" "}
                  {gander}
                </p>
                <p>
                  <span className="numbers">5</span>years Experience
                </p>
              </div>
              <div className="speciality-dp">
                <h4>Speciality</h4>
                <div className="speciality-info-dp">
                  {Speciality.map((specialty, ind) => (
                    <p key={ind}>{specialty}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="doc-rating-dp">
            <div className="rating-icon">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <div className="vote-amount-dp">
              <p>
                <span className="numbers">150</span> votes
              </p>
            </div>
            <p className="check-verified">Medical Registration Varfied</p>
          </div>
        </div>
        <div className="about-doc-sec-dp dp-container">
          <h3>Other Information</h3>
          <p>
            <b>Extra Quility : </b>
            {extraQuility}
          </p>
          <p>
            <b>History : </b>
            {pastHistory}
          </p>
        </div>
      </section>
      <section className=" my-container chamber-list">
        {chamber.map((el) => (
          <Chambers
            key={el._id}
            data={el}
            setChamberInfo={setChamberInfo}
            showAppForm={showAppointForm}
          ></Chambers>
        ))}
      </section>
      {appointForm ? (
        <Appointform
          chamberInfo={chamberInfo}
          showAppForm={showAppointForm}
          setChamberInfo={setChamberInfo}
          docData={data}
          appForm={appointForm}
          setAppointForm={setAppointForm}
        ></Appointform>
      ) : (
        ""
      )}
    </>
  );
};

export default DoctorDetails;
