import {useParams} from "react-router-dom";
import {useState} from "react";
import {useEffect} from "react";
import {FiLogIn} from "react-icons/fi";
import logo from "./../../Components/Images/UOPlogo.png";

const Application = () => {
  const {course_id, applicant_id} = useParams();
  const [application, setApplication] = useState(null);

  const getApplications = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/application/get/' + course_id + '/' + applicant_id
      );

      if (response.ok) {
        const jsonData = await response.json();
        setApplication(jsonData);
        console.log(jsonData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getApplications();
  }, [course_id, applicant_id]);

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

  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <>
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
                {/* Designation and Name */}
                <div className="flex">
                  <div className="w-1/2 mr-2">
                    <label className="inline-block mb-2 text-sm font-medium text-gray-900">
                      Designation :
                    </label>
                    <span className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5">
                      {(application && application.sdcApplicant) ? application.sdcApplicant.designation : null}
                    </span>
                  </div>

                  <div className="w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Applicant Name :
                    </label>
                    <span className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5">
                      {(application && application.sdcApplicant)?(application.sdcApplicant.name):null}
                    </span>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-1/2 mr-2">
                    <label className="inline-block mb-2 text-sm font-medium text-gray-900">
                      Email :
                    </label>
                    <span className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5">
                      {(application && application.sdcApplicant) ?application.sdcApplicant.email:null}
                    </span>
                  </div>

                  <div className="w-1/2">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Selected Course Name :
                    </label>
                    <span className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5">
                      {(application && application.mdlCourse) ? application.mdlCourse.fullname:null}
                    </span>
                  </div>
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
    </>
  );
};

export default Application;
