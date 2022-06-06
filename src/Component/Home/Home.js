import React, { useEffect } from "react";
import LeftSec from "./LeftSec/LeftSec";
import MainSec from "./MainSec/MainSec";
import RightSec from "./RightSec/RightSec";
import "./Home.css";
import Nav from "../Nav/Nav";
const Home = () => {
  useEffect(() => {
    const userId = localStorage.getItem("acc-token");
    console.log(userId);
  }, []);
  return (
    <>
      <Nav></Nav>
      <div className="my-container home-div">
        <LeftSec></LeftSec>
        <MainSec></MainSec>
        <RightSec></RightSec>
      </div>
    </>
  );
};

export default Home;
