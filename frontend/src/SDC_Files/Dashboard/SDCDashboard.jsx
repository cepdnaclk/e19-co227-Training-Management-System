// imports
import SDCNavbar from "../SDCNavbar";
import { Step } from "../Templates/Step";
import Logo from "./../../Components/Images/UOPlogo.png";

// main function
const SDCDashboard = () => {

  // useStates
  // Arrays
  // Navigation
  // Functions

  // html, css, js all together -> typeScript
  return (
    <>
      <SDCNavbar />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Step />
        <div className="mt-12 text-center">
          <img
            src={Logo}
            width="200"
            className="inline-block transform -translate-y-2"
            alt="Logo"
            style={{ opacity: 0.8 }}
          />
          <br/>
          <span className="animate-pulse font-bold text-9xl text-gray-600">SDC</span>
          <br />
          <span className="animate-pulse font-bold text-xl text-gray-700">Staff Development Centre</span>
        </div>
      </div>
      <div className="pb-20 p-5 select-none">
        {/* content goes inside this div */}
      </div>
    </>
  );
}

export default SDCDashboard;
