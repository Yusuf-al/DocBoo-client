import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./form.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Spinner from "../Spinner/Spinner";

const DoctorForm = () => {
  const imgAPI = "8ed68066b72ebb0173efded620c45afa";
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(0);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();
  const [user] = useAuth();
  console.log(user);

  if (user?.isCompleted) {
    navigate("/doctor/my-profile");
  }
  if (user?.role === "gen-user") {
    navigate("/");
  }

  //

  const handleTags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const values = e.target.value;
      setTags([...tags, values]);
      e.target.value = "";
    }
  };

  if (isSubmitting) {
    return <Spinner></Spinner>;
  }

  const nextPage = (e) => {
    e.preventDefault();
    const next = page + 1;
    setPage(next);
  };

  const prevPage = (e) => {
    e.preventDefault();
    const prev = page - 1;
    setPage(prev);
  };

  const handleDocInfo = async (data) => {
    const personalInfo = {
      name: data.name,
      phoneNum: data.phnNum,
      dob: data.dob,
      gander: data.gander,
      address: data.address,
      socialMedia: data.socialMedia,
    };

    const academicInfo = {
      schoolInfo: [data.schoolName, data.schoolYear, data.schoolPer],
      collegeInfo: [data.collName, data.collYear, data.collPer],
      mbbsInfo: [data.mbbsName, data.mbbsYear, data.mbbsPer],
      otherDegInfo: [data.exColl, data.exPer, data.exYear],
      extraQuility: data.exQua,
    };
    const professionalInfo = {
      workdPlace: data.WorkPlace,
      currentPosition: data.currPos,
      pastHistory: data.pasHis,
      tobTitle: data.jobTitle,
      exprience: data.exprience,
      specialties: [...tags],
    };

    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imgAPI}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const docInfo = {
            ...personalInfo,
            ...academicInfo,
            ...professionalInfo,
            userDel: user._id,
            profileImg: result.data.url,
          };

          fetch("http://localhost:5080/api/v1/doctor", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(docInfo),
          })
            .then((res) => res.json())
            .then((docData) => {
              if (docData.success) {
                fetch(`http://localhost:5080/api/v1/auth/${user._id}`, {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .then((finaldata) => {
                    console.log(docData);
                    // reset();
                    toast.success("Profile Updated successfully");
                  });
              }
            });
        }
      });
  };

  return (
    <div className="modalContainer mx-auto my-5">
      <form
        action=""
        onSubmit={handleSubmit(handleDocInfo)}
        className="w-full mx-auto"
      >
        {page === 0 && (
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
                  id="name-input"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Enter name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label>
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-grp">
                <label htmlFor="phone-Num">Contact No:</label>
                <input
                  type="text"
                  id="phone-Num"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Phone Number"
                  {...register("phnNum", {
                    required: {
                      value: true,
                      message: "Phone No is Required",
                    },
                  })}
                />
                <label>
                  {errors.phnNum?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.phnNum.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-grp">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Enter Date of birth"
                  {...register("dob", {
                    required: {
                      value: true,
                      message: "Birthday is Required",
                    },
                  })}
                />
                <label>
                  {errors.dob?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.dob.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-grp">
                <label for="gander">Gander :</label>
                <select
                  id="gander"
                  className="input input-bordered rounded-md input-info w-full"
                  {...register("gander", {
                    required: {
                      value: true,
                      message: "Gender is Required",
                    },
                  })}
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
                  id="doc-address"
                  cols="30"
                  rows="10"
                  {...register("address", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                  className="textarea rounded-md textarea-info"
                ></textarea>
                <label>
                  {errors.address?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.address.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-grp">
                <label htmlFor="health-issue">Social Media Account</label>
                <input
                  type="text"
                  className="input input-bordered rounded-md input-info w-full"
                  {...register("socialMedia", {
                    required: {
                      value: true,
                      message: "social Media is Required",
                    },
                  })}
                />
              </div>
              <div className="form-grp mt-2">
                <label htmlFor="health-issue">Profile Photo</label>
                <input
                  type="file"
                  className=" w-full"
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Image is Required",
                    },
                  })}
                />
              </div>
            </div>
          </>
        )}
        {page === 1 && (
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
                    placeholder="School Name"
                    className="input input-bordered rounded-md input-info w-full my-1"
                    {...register("schoolName", {
                      required: {
                        value: true,
                        message: "school Nameis Required",
                      },
                    })}
                  />
                  <label>
                    {errors.schoolName?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.schoolName.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
                    placeholder="passing year"
                    {...register("schoolYear", {
                      required: {
                        value: true,
                        message: "school Passing year is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.schoolYear?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.schoolYear.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Parcentage"
                    className="input input-bordered rounded-md input-info w-50 my-1"
                    {...register("schoolPer", {
                      required: {
                        value: true,
                        message: "school Nameis Required",
                      },
                    })}
                  />
                  <label>
                    {errors.schoolYear?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.schoolYear.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div class="form-grp">
                <label for="name">12th or Equevalent Examination :</label>
                <div class="academic-year">
                  <input
                    type="text"
                    placeholder="College Name"
                    className="input input-bordered rounded-md input-info w-full my-1"
                    {...register("collName", {
                      required: {
                        value: true,
                        message: "College Name is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.collName?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.collName.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
                    placeholder="passing year"
                    {...register("collYear", {
                      required: {
                        value: true,
                        message: "College passing year is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.collYear?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.collYear.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Parcentage"
                    className="input input-bordered rounded-md input-info w-50 my-1"
                    {...register("collPer", {
                      required: {
                        value: true,
                        message: "Passing percentage year is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.collPer?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.collPer.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div class="form-grp">
                <label for="name">MBBS or Equevalent Examination :</label>
                <div class="academic-year">
                  <input
                    type="text"
                    placeholder="MBBS Institution Name"
                    className="input input-bordered rounded-md input-info w-full my-1"
                    {...register("mbbsName", {
                      required: {
                        value: true,
                        message: "MBBS Institution Name is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.mbbsName?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.mbbsName.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
                    placeholder="Passing year"
                    {...register("mbbsYear", {
                      required: {
                        value: true,
                        message: "MBBS passing year is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.mbbsYear?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.mbbsYear.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Parcentage"
                    className="input input-bordered rounded-md input-info w-50 my-1"
                    {...register("mbbsPer", {
                      required: {
                        value: true,
                        message: "MBBS passing parcentage is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.mbbsPer?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.mbbsPer.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div class="form-grp">
                <label for="name">Other Degree (if any) :</label>
                <div class="academic-year">
                  <input
                    type="text"
                    placeholder="College Name"
                    className="input input-bordered rounded-md input-info w-full my-1"
                    {...register("exColl", {
                      required: {
                        value: true,
                        message: "College name is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.exColl?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.exColl.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
                    placeholder="passing year"
                    {...register("exYear", {
                      required: {
                        value: true,
                        message: "MBBS passing parcentage is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.exYear?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.exYear.message}
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Parcentage"
                    className="input input-bordered rounded-md input-info w-50 my-1"
                    {...register("exPer", {
                      required: {
                        value: true,
                        message: " parcentage is Required",
                      },
                    })}
                  />
                  <label>
                    {errors.exPer?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.exPer.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
              <div className="form-grp">
                <label htmlFor="health-issue">Extra Qualification : </label>
                <textarea
                  id="health-issue"
                  cols="30"
                  rows="10"
                  className="textarea rounded-md textarea-info"
                  {...register("exQua", {
                    required: {
                      value: true,
                      message: " parcentage is Required",
                    },
                  })}
                ></textarea>
                <label>
                  {errors.exQua?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.exQua.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </>
        )}
        {page === 2 && (
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
                  id="current-Position"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Current Position"
                  {...register("currPos", {
                    required: {
                      value: true,
                      message: " Current Position is Required",
                    },
                  })}
                />
                <label>
                  {errors.currPos?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.currPos.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-grp">
                <label htmlFor="phone-Num">Your Work place</label>
                <input
                  type="text"
                  id="WorkPlace"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Your Work place"
                  {...register("WorkPlace", {
                    required: {
                      value: true,
                      message: " Your Work place is Required",
                    },
                  })}
                />
                <label>
                  {errors.WorkPlace?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.WorkPlace.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-grp">
                <label htmlFor="patient-address">Employment History</label>
                <textarea
                  id="patient-address"
                  cols="30"
                  rows="10"
                  className="textarea rounded-md textarea-info"
                  {...register("pasHis", {
                    required: {
                      value: true,
                      message: " Write Somthing",
                    },
                  })}
                ></textarea>
                <label>
                  {errors.pasHis?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.pasHis.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-grp">
                <div className="flex flex-row mt-2">
                  <div>
                    <label htmlFor="">Exprience</label>
                    <input
                      type="text"
                      className="input input-bordered rounded-md input-info w-50 my-1 mr-5"
                      placeholder="Exprience"
                      {...register("exprience", {
                        required: {
                          value: true,
                          message: "Exprience is Required",
                        },
                      })}
                    />
                    <label>
                      {errors.exprience?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.exprience.message}
                        </span>
                      )}
                    </label>
                  </div>
                  <div>
                    <label htmlFor="">Job Title</label>
                    <input
                      type="text"
                      className="input input-bordered rounded-md input-info w-[270px] my-1"
                      placeholder="Job Title"
                      {...register("jobTitle", {
                        required: {
                          value: true,
                          message: " Your Work place is Required",
                        },
                      })}
                    />
                    <label>
                      {errors.jobTitle?.type === "required" && (
                        <span className="label-text-alt text-red-500">
                          {errors.jobTitle.message}
                        </span>
                      )}
                    </label>
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
        )}
        <div className="footer">
          {page === 0 && (
            <button onClick={nextPage} className=" btn text-center">
              Next
            </button>
          )}

          {page === 1 && (
            <>
              <button onClick={prevPage} className=" btn text-center">
                Prev
              </button>
              <button onClick={nextPage} className=" btn text-center">
                Next
              </button>
            </>
          )}
          {page === 2 && (
            <>
              <button onClick={prevPage} className=" btn text-center">
                Prev
              </button>
              <button className=" btn text-center">Submit</button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;

// const name = useRef("");
// const phoneNum = useRef("");
// const dob = useRef("");
// const gander = useRef("");
// const address = useRef("");
// const socialMedia = useRef("");

// const doc10school = useRef("");
// const doc10year = useRef("");
// const doc10per = useRef("");
// const docCollName = useRef("");
// const docCollPer = useRef("");
// const docCollYear = useRef("");
// const mbbsColl = useRef("");
// const mbbsPer = useRef("");
// const mbbsYear = useRef("");
// const exName = useRef("");
// const exYear = useRef("");
// const exPer = useRef("");
// const exQua = useRef("");
// const checkData = () => {

//   const data = { ...personalInfo, ...academicInfo, ...professionalInfo };
//   console.log(data);
// };
//const currentPosition = useRef("");
// const jobTitle = useRef("");
// const exprience = useRef("");
// const pastHistory = useRef("");
// const workPlace = useRef("");
// const [doctorData, setDoctorData] = useState({
//   name: "",
//   phoneNum: " ",
//   dob: " ",
//   gander: " ",
//   address: " ",
//   socialMedia: " ",
//   schoolInfo: [],
//   collegeInfo: [],
//   mbbsInfo: [],
//   otherDegInfo: [],
//   extraQuility: " ",
//   workdPlace: "",
//   currentPosition: "",
//   pastHistory: "",
//   tobTitle: "",
//   exprience: "",
//   specialties: [],
// });

// const [academicdata, setAcademicData] = useState({});
// const [personaldata, setPersonalData] = useState({});
// const [professionaldata, setProfessionalData] = useState({});
