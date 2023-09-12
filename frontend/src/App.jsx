import React from "react";
import {Route, Routes} from "react-router-dom";

import Login from "./LoginFiles/Login";

import UserRegistration from "./Register_Files/UserRegistration";

import SDCDashboard from "./SDC_Files/SDCDashboard";
import AnnounceCourse from "./SDC_Files/AnnounceCourse";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/user/register" element={<UserRegistration />} />

        <Route path="/sdc/dashboard" element={<SDCDashboard />} />
        <Route path="/sdc/announce" element={<AnnounceCourse />} />
      </Routes>
    </>
  );
}

export default App;
