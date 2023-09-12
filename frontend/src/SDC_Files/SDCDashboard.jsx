import React from "react";

import SDCNavbar from "./SDCNavbar";

function SDCDashboard() {
  return (
    <>
      <SDCNavbar />
      <div className="pb-20 p-5 select-none">
        {/* content goes inside this div */}

        <h1 className="text-5xl text-center">Test</h1>
      </div>
    </>
  );
}

export default SDCDashboard;
