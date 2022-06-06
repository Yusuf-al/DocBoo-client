import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.userEmail.value,
      password: e.target.userPass.value,
    };
    setLoading(true);
    fetch("http://localhost:5080/api/v1/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.success === false) {
          return toast.error("email or password doesn't match");
        }

        if (result.token) {
          localStorage.setItem("acc-token", result.token);
        }

        if (
          result.user.isCompleted === false &&
          result.user.role === "doctor"
        ) {
          navigate("/doctor/complete-profile");
        }

        if (result.user.isCompleted === true && result.user.role === "doctor") {
          return navigate("/doctor/my-profile");
        }

        if (
          result.user.isCompleted === false &&
          result.user.role === "gen-user"
        ) {
          return navigate("/gen-user/complete-profile");
        } else {
          navigate("/");
        }
        setLoading(false);
        return toast.success("Log in successfull");
      });
  };

  return (
    <div>
      <div className="modalBackground ">
        <form className="w-full mx-auto" onSubmit={handleLogin}>
          <div className="modalContainer mx-auto" style={{ width: "28%" }}>
            <div>
              <h1 className="uppercase text-blue-700 text-xl text-center font-semibold">
                Log In
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
            </div>
            <div className="footer my-4">
              {loading ? (
                <button class="btn loading">loading</button>
              ) : (
                <button type="submit" className=" btn text-center">
                  Log in
                </button>
              )}

              <br />
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/registration" className="text-blue-500">
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
