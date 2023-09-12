import React from "react";
import {useRef} from "react";
import {useState} from "react";

import {FiLogIn} from "react-icons/fi";

import logo from "../Components/Images/UOPlogo.png";

function UserRegistration() {
  const coursesList = ["Course 01", "Course 02"];

  // Title hover
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const linkClasses = `flex items-center justify-center text-2xl font-semibold ${
    isHovered ? "underline" : ""
  }`;

  // Format the current Date : YYYY-MM-DD
  const getCurrentDateFormatted = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  //Set the values
  const [formData, setFormData] = useState({
    designation: "",
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    course: "",

    dateRegistered: getCurrentDateFormatted(),
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let registerMsg = document.getElementById("registerMsg");

    if (true) {
      registerMsg.textContent = "Registration Successful";
      registerMsg.className =
        "bg-emerald-200 w-1/2 flex items-center justify-center text-xl text-gray-900 rounded-md py-1";
    } else {
      registerMsg.textContent = "Registration Not Successful";
      registerMsg.className =
        "bg-red-200 w-1/2 flex items-center justify-center text-xl text-gray-900 rounded-md py-1";
    }
  };

  return (
    <section className="bg-gradient-to-br from-gray-700 via-black to-gray-700 py-5 min-w-screen min-h-screen select-none">
      <div className="flex flex-col items-center justify-center mx-auto">
        {/* Logo area */}
        <div className="flex items-center mb-4">
          <img src={logo} width={100} />
        </div>

        {/* Register form */}
        <div className="w-full bg-white rounded-lg text-black sm:max-w-xl xl:p-0">
          <div className="px-6 p-4 space-y-4">
            <a
              href="https://sdc.pdn.ac.lk/index.html"
              className={linkClasses}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              Staff Development Center
            </a>
            <div className="flex">
              <div className="w-1/4"></div>

              <div
                id="registerMsg"
                className="bg-transparent w-1/2 flex items-center justify-center  text-xl text-gray-900 rounded-md py-1"
              >
                Course Registration
              </div>

              <div className="w-1/4"></div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Designation */}
              <div className="w-1/2">
                <label className="inline-block mb-2 text-sm font-medium text-gray-900">
                  Designation<span className="text-red-500 ">*</span> :
                </label>
                <select
                  className="text-sm font-medium text-gray-900 inline-block"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled defaultValue>
                    Select an option
                  </option>
                  <option>Lecturer (Prob)</option>
                  <option>Lecturer</option>
                  <option>Senior Lecturer Grade II</option>
                  <option>Senior Lecturer Grade I</option>
                  <option>Assoc. Professor</option>
                  <option>Professor</option>
                  <option>Senior Professor</option>
                </select>
              </div>

              {/* First name and Last name */}
              <div className="flex">
                <div className="w-1/2 mr-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    First Name<span className="text-red-500 ">*</span> :
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Last Name<span className="text-red-500 ">*</span> :
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email and Designation */}
              <div className="flex">
                <div className="w-1/2 mr-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Email address<span className="text-red-500 ">*</span> :
                  </label>
                  <input
                    type="email"
                    placeholder="user@fac.pdn.ac.lk"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-1/2">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    SDC Moodle Username<span className="text-red-500 ">*</span>{" "}
                    :
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Course list */}
              <div>
                <label className="inline-block mb-2 text-sm font-medium text-gray-900">
                  Select Course<span className="text-red-500 ">*</span> :
                </label>
                <select
                  className="text-sm font-medium text-gray-900 inline-block"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled defaultValue>
                    Select the Course
                  </option>
                  {coursesList.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Authorizations */}

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label>
                    Authorization by Faculty Dean
                    <span className="text-red-500 "> *</span>
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label>
                    Authorization by Department Head
                    <span className="text-red-500 "> *</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-400 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              >
                <FiLogIn className="inline mr-2 mb-1" fontSize={25} />
                Register
              </button>
              <p className="text-sm font-light text-gray-500">
                Already registered? <span> </span>
                <a
                  href="https://sdc-conect.pdn.ac.lk/login/index.php"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserRegistration;
