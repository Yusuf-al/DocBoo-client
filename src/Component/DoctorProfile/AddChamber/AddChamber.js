import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import "./AddChamber.css";

const AddChamber = () => {
  const [user, loading] = useAuth();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    getValues,
  } = useForm();

  console.log(user?.userInfo?.[0]._id);

  const handleChamber = async (data) => {
    const chamberData = {
      chamberName: data.chamName,
      contactNumber: data.phnNum,
      address: data.chamAdd,
      doctorData: user?.userInfo?.[0]._id,
      dailyLimit: data.limit,
      mon: [data.monstr, data.monend, getValues("monOffDay")],
      tue: [data.tuestr, data.tueend, getValues("tueOffDay")],
      wed: [data.wedstr, data.wedend, getValues("wedOffDay")],
      thu: [data.thustr, data.thuend, getValues("thuOffDay")],
      fri: [data.fristr, data.friend, getValues("friOffDay")],
      sat: [data.satstr, data.satend, getValues("satOffDay")],
      sun: [data.sunstr, data.sunend, getValues("sunOffDay")],
    };

    fetch("http://localhost:5080/api/v1/chamber", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(chamberData),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          console.log(result);
          toast.success("New Chamber has been added");
        }
      });

    console.log(chamberData);
  };

  return (
    <section id="chamber-list">
      <form
        className="chamber-form sec-com"
        onSubmit={handleSubmit(handleChamber)}
      >
        <h1 className="text-center text-2xl my-2">Add Chambers</h1>
        <div className="sec-div information">
          <div className="form-grp">
            <label for="chamber-name">Chamber Name </label>
            <input
              type="text"
              className="input input-bordered rounded-md input-info w-full"
              placeholder="Chamber Name"
              {...register("chamName", {
                required: {
                  value: true,
                  message: "Chamber Name is Required",
                },
              })}
            />
            <label>
              {errors.chamName?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.chamName.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-grp">
            <label for="chamber-Phonr">Conact No :</label>
            <input
              type="text"
              className="input input-bordered rounded-md input-info w-full"
              placeholder="Enter phone number"
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
            <label for="chamber-address">Chamber Address</label>
            <textarea
              className="input input-bordered rounded-md input-info w-full"
              cols="30"
              rows="10"
              {...register("chamAdd", {
                required: {
                  value: true,
                  message: "Chamber Address is Required",
                },
              })}
            ></textarea>
            <label>
              {errors.chamAdd?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.chamAdd.message}
                </span>
              )}
            </label>
          </div>
          <div className="form-grp">
            <label for="chamber-name">Daily Limit</label>
            <input
              type="text"
              className="input input-bordered rounded-md input-info w-full"
              placeholder="Daily Limit"
              {...register("limit", {
                required: {
                  value: true,
                  message: "Daily Limit is Required",
                },
              })}
            />
            <label>
              {errors.limit?.type === "required" && (
                <span className="label-text-alt text-red-500">
                  {errors.limit.message}
                </span>
              )}
            </label>
          </div>
          <div>
            <h3 className="text-xl text-center my-3">Add Your Timetable</h3>
            <div>
              <div className="timingAdd">
                <label for="">Monday</label>
                <input
                  type="time"
                  {...register("monstr")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <span className="to-span">TO</span>
                <input
                  type="time"
                  {...register("monend")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <div className="offday-sec">
                  <input
                    type="checkbox"
                    {...register("monOffDay")}
                    value="off-day"
                    id="off-day"
                  />
                  <label for="off-day">Off Day</label>
                </div>
              </div>
              <div className="timingAdd">
                <label for="">Tuesday</label>
                <input
                  type="time"
                  {...register("tuestr")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <span className="to-span">TO</span>
                <input
                  type="time"
                  {...register("tueend")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <div className="offday-sec">
                  <input
                    type="checkbox"
                    {...register("tueOffDay")}
                    value="off-day"
                    id="off-day"
                  />
                  <label for="off-day">Off Day</label>
                </div>
              </div>
              <div className="timingAdd">
                <label for="">Wednesday</label>
                <input
                  type="time"
                  {...register("wedstr")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <span className="to-span">TO</span>
                <input
                  type="time"
                  {...register("wedend")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <div className="offday-sec">
                  <input
                    type="checkbox"
                    {...register("wedOffDay")}
                    value="off-day"
                    id="off-day"
                  />
                  <label for="off-day">Off Day</label>
                </div>
              </div>
              <div className="timingAdd">
                <label for="">Thursday</label>
                <input
                  type="time"
                  {...register("thustr")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <span className="to-span">TO</span>
                <input
                  type="time"
                  {...register("thuend")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <div className="offday-sec">
                  <input
                    type="checkbox"
                    {...register("thuOffDay")}
                    value="off-day"
                    id="off-day"
                  />
                  <label for="off-day">Off Day</label>
                </div>
              </div>
              <div className="timingAdd">
                <label for="">Friday</label>
                <input
                  type="time"
                  {...register("fristr")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <span className="to-span">TO</span>
                <input
                  type="time"
                  {...register("friend")}
                  className="input input-bordered rounded-md input-info w-28"
                />
                <div className="offday-sec">
                  <input
                    type="checkbox"
                    {...register("friOffDay")}
                    value="off-day"
                    id="off-day"
                  />
                  <label for="off-day">Off Day</label>
                </div>
              </div>
              <div className="timingAdd">
                <label for="">Saturday</label>
                <input
                  type="time"
                  {...register("satstr")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <span className="to-span">TO</span>
                <input
                  type="time"
                  {...register("satend")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <div className="offday-sec">
                  <input
                    type="checkbox"
                    {...register("satOffDay")}
                    value="off-day"
                    id="off-day"
                  />
                  <label for="off-day">Off Day</label>
                </div>
              </div>
              <div className="timingAdd">
                <label for="">Sunday</label>
                <input
                  type="time"
                  {...register("sunstr")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <span className="to-span">TO</span>
                <input
                  type="time"
                  {...register("sunend")}
                  className="input input-bordered rounded-md input-info w-28"
                />

                <div className="offday-sec">
                  <input
                    type="checkbox"
                    {...register("sunOffDay")}
                    value="off-day"
                    id="off-day"
                  />
                  <label for="off-day">Off Day</label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button className=" btn btn-primary rounded-md text-center w-60 my-5">
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddChamber;
