import React from "react";
import {Route, Routes} from "react-router-dom";

import UserRegistration from "./Register_Files/UserRegistration";

function App() {
  return (
    <>
      <Routes>
        <Route path="/user" element={<UserRegistration />} />
      </Routes>
    </>
  );
}

export default App;
