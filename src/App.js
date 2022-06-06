import { Route, Routes } from "react-router-dom";
import DoctorDetails from "./Component/DoctorDetails/DoctorDetails";
import Profile from "./Component/DoctorProfile/Profile/Profile";
import Home from "./Component/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Registration from "./Component/Registration/Registration";
import EmailVerify from "./Component/EmailVerify/EmailVerify";
import Login from "./Component/Login/Login";
import DoctorForm from "./Component/DoctorForm/DoctorForm";
import RoutAuth from "./hooks/RoutAuth";
import Userform from "./Component/UserForm/Userform";
import ProfileUser from "./Component/UserProfile/ProfileUser/ProfileUser";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RoutAuth role="gen-user">
              <Home></Home>
            </RoutAuth>
          }
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/doctor/complete-profile"
          element={
            <RoutAuth role={"doctor"}>
              <DoctorForm></DoctorForm>
            </RoutAuth>
          }
        ></Route>
        <Route
          path="/:id/veryfi/:token"
          element={<EmailVerify></EmailVerify>}
        ></Route>
        <Route
          path="/registration"
          element={<Registration></Registration>}
        ></Route>
        <Route
          path="/doctor/:slug"
          element={<DoctorDetails></DoctorDetails>}
        ></Route>
        <Route
          path="doctor/my-profile/*"
          element={
            <RoutAuth role="doctor">
              <Profile></Profile>
            </RoutAuth>
          }
        ></Route>
        <Route
          path="user-profile/*"
          element={
            <RoutAuth role="gen-user">
              <ProfileUser></ProfileUser>
            </RoutAuth>
          }
        ></Route>
        <Route
          path="gen-user/complete-profile"
          element={
            <RoutAuth role="gen-user">
              <Userform></Userform>
            </RoutAuth>
          }
        ></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
