// imports
import { useState } from "react";
import SDCNavbar from "../SDCNavbar";
import { Step } from "../Templates/Step";
import Logo from "./../../Components/Images/UOPlogo.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// main function
const SDCDashboard = () => {

  // useStates
  // Arrays
  const [coureses, setCourses] = useState([]);
  // Navigation
  const navigate = new useNavigate();

  // functions

  // fetch new courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/course/get', { method: 'GET', redirect: 'follow', credentials: 'include' });
      if (response.redirected) {
        document.location = response.url;
      }
      console.log(response.status);
      if (response.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (response.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (response.ok) {
        const jsonData = await response.json();
        const courseNames = jsonData.map((item) => item.fullname);
        setCourses(courseNames);
        console.log("CourseData:",courseNames)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // html, css, js all together -> typeScript
  return (
    <>
      <SDCNavbar />
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Step />
        <div className="m-7 text-center">
          <span className="animate-pulse font-bold mt-0 text-7xl text-gray-600">SDC</span>
          <br />
          <span className="animate-pulse font-bold text-sm text-gray-700">Staff Development Centre</span>
          <br/>
          <div className="font-bold text-lg text-gray-900 mt-3 bg-amber-200 p-1 rounded-lg">List of Upcomming Courses</div>
          {coureses.map((courese) => (
            <div key={courese} className="p-1 m-1 bg-gray-800 text-amber-200 font-medium text-center rounded-lg hover:bg-slate-300 hover:text-gray-800">{courese}</div>
          ))};
        </div>
      </div>
      <div className="pb-20 p-5 select-none">
        {/* content goes inside this div */}
      </div>
    </>
  );
}

export default SDCDashboard;
