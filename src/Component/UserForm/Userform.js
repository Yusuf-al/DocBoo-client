import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner/Spinner";

const Userform = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [user] = useAuth();
  console.log(user);

  const imgAPI = "8ed68066b72ebb0173efded620c45afa";
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  if (user?.isCompleted) {
    navigate("/");
    return toast.warning("Forbiden access");
  }
  //   if (loading) {
  //     return <Spinner></Spinner>;
  //   }

  const handleUserInfo = async (data) => {
    setLoading(true);
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
          const userInfo = {
            name: data.name,
            userDel: user?._id,
            phoneNum: data.phnNum,
            dob: data.dob,
            address: data.address,
            healthIssu: data.helIssue,
            gender: data.gander,
            userPhoto: result.data.url,
          };
          fetch("http://localhost:5080/api/v1/gen-user", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userInfo),
          })
            .then((res) => res.json())
            .then((userData) => {
              if (userData.success) {
                fetch(`http://localhost:5080/api/v1/auth/${user._id}`, {
                  method: "PUT",
                  headers: {
                    "content-type": "application/json",
                  },
                })
                  .then((res) => res.json())
                  .then((finaldata) => {
                    console.log(userData);
                    console.log(finaldata);
                    reset();
                    setLoading(false);
                    navigate("/");
                    toast.success("Profile Updated successfully");
                  });
              }
            });
        }
      });
  };
  return (
    <div className="modalContainer mx-auto my-5">
      <h1 className="uppercase text-blue-700 text-xl text-center font-semibold">
        User Information
      </h1>
      <form onSubmit={handleSubmit(handleUserInfo)}>
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
                  message: "Address is Required",
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
            <label htmlFor="health-issue">Health issue</label>
            <textarea
              type="text"
              className="textarea rounded-md textarea-info"
              {...register("helIssue", {
                required: {
                  value: true,
                  message: "write somethins",
                },
              })}
            />
            <label>
              {errors.helIssue?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.helIssue.message}
                </span>
              )}
            </label>
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
          <div className="footer my-4">
            {loading ? (
              <button class="btn loading">loading</button>
            ) : (
              <button type="submit" className=" btn text-center">
                Submit
              </button>
            )}

            <br />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Userform;
