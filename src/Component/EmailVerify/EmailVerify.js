import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EmailVerify = () => {
  const [validurl, setValidurl] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const verify = () => {
    try {
      fetch(
        `http://localhost:5080/api/v1/auth/${params.id}/veryfi/${params.token}`
      )
        .then((res) => {
          console.log(res);
          if (res.status === 400) {
            setValidurl(false);
          }
          return res.json();
        })
        .then((data) => console.log(data));
      setValidurl(true);
    } catch (error) {
      console.log(error);
      setValidurl(false);
    }
  };

  useEffect(() => {
    verify();
  }, [params]);

  return (
    <div className="modalBackground ">
      <div className="modalContainer mx-auto">
        <div className="titleCloseBtn"></div>
        <div>
          <h1 className="uppercase text-blue-700 text-xl text-center font-semibold">
            Welcome to DokBook
          </h1>
        </div>
        {validurl ? (
          <>
            <div className="title">
              <p>
                <img
                  src="https://www.nicepng.com/png/detail/362-3624869_icon-success-circle-green-tick-png.png"
                  className="m-auto w-28 my-4"
                  alt=""
                />
              </p>
              <h1 className="uppercase text-blue-700 ">
                Your email has been verfied successfully
              </h1>
            </div>

            <div className="footer">
              <button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Go to Log in
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="title">
              <p>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/480px-Cross_red_circle.svg.png"
                  className="m-auto w-28"
                  alt=""
                />
              </p>
              <h1 className="uppercase text-red-700 text-4xl text-center mt-5">
                400
              </h1>
              <h1 className="uppercase text-red-300 text-2xl text-center mt-2">
                This link is no more valid
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailVerify;
