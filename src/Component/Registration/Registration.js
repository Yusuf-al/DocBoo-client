import React, { useState } from "react";
import { toast } from "react-toastify";
import "./Registration.css";
import Spinner from "./../Spinner/Spinner";
import { Link } from "react-router-dom";

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(false);

  const handleRegistration = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.userEmail.value.trim(),
      password: e.target.userPass.value.trim(),
      confirmPass: e.target.conPass.value.trim(),
      role: e.target.role.value,
    };

    setLoading(true);

    if (data.password !== data.confirmPass) {
      return toast.warning("Password doesn't match");
    }

    fetch("http://localhost:5080/api/v1/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((result) => {
        if (result.success === false) {
          setLoading(false);
          return toast.error(
            "Email already exits. Please try with a new email"
          );
        }
        setLoading(false);
        toast.success("user Registration successful");
        setMessage(true);
      });

    e.target.userEmail.value = "";
    e.target.userPass.value = "";
    e.target.conPass.value = "";
    e.target.role.value = "Select a role ";
  };

  return (
    <div>
      <div className="modalBackground ">
        <form className="w-full mx-auto" onSubmit={handleRegistration}>
          <div className="modalContainer mx-auto" style={{ width: "30%" }}>
            <div>
              <h1 className="uppercase text-blue-700 text-xl text-center font-semibold">
                User Registration
              </h1>
              <i class="fas fa-user"></i>
            </div>

            <div>
              <div className="form-grp">
                <label htmlFor="user-email">Email Address</label>
                <input
                  type="email"
                  name="userEmail"
                  id="user-email"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div className="form-grp">
                <label htmlFor="user-pass">Password</label>
                <input
                  type="password"
                  name="userPass"
                  id="user-pass"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Enter Password"
                  required
                />
              </div>
              <div className="form-grp">
                <label htmlFor="con-pass">Confirm Password</label>
                <input
                  type="password"
                  name="conPass"
                  id="con-pass"
                  className="input input-bordered rounded-md input-info w-full"
                  placeholder="Re-Enter Password"
                  required
                />
              </div>
              <div className="flex items-center my-4">
                <label htmlFor="con-pass">You are a :</label>
                <select name="role" class="select select-info ml-5 rounded-md">
                  <option disabled selected>
                    Select a role
                  </option>
                  <option value="doctor">Doctor</option>
                  <option value="gen-user">Genarel User</option>
                </select>
              </div>
            </div>
            <div className="footer">
              {loading ? (
                <button class="btn loading">loading</button>
              ) : (
                <button type="submit" className=" btn text-center">
                  Submit
                </button>
              )}

              <br />
            </div>
            {message ? (
              <>
                <p className="verify">Please Verify your email address</p>
              </>
            ) : (
              <>
                <p className="text-center">
                  Already have an account?
                  <Link to="/login" className="text-blue-500">
                    {" "}
                    Please log in
                  </Link>
                </p>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
