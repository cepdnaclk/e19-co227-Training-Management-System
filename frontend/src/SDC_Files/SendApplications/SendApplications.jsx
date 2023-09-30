// imports
import { useState, useEffect } from "react";
import SDCNavbar from "../SDCNavbar";
import ApplicantForm1 from "./ApplicantForm1";
import ApplicantForm2 from "./ApplicantForm2";

export default function SendApplications() {

  // use states
  const [courses, setCourses] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [applicantData, setApplicantData] = useState([]);
  const [step, setStep] = useState(1);
  const [selectedCourseID, setSelectedCourseID] = useState();
  const [selectedCourseName, setSelectedCourseName] = useState();
  const [formData, setFormData] = useState({
    selectedApplicant: "",
    selectedNames: [],
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    fetchApplicants();
  }, []);

  // Take all the courses from the backend and store courses along with course id
  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8080/course/get");

      if (response.ok) {
        const jsonData = await response.json();
        const courseData = jsonData.map((item) => ({
          courseID: item.id,
          courseName: item.fullname,
        }));
        setCourses(courseData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchApplicants = async () => {
    try {
      const response = await fetch("http://localhost:8080/applicant/get");

      if (response.ok) {
        const jsonData = await response.json();
        // console.log(jsonData)
        const applicantNames = jsonData.map((item) => item.name);
        setApplicants(applicantNames)
        setApplicantData(jsonData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [selectedApplicantData, setselectedApplicantData] = useState([]);

  //Check whether form 1 is submitted
  const handleForm1Submit = (data) => {
    //Set the course name and names of the faculties into local state
    setFormData(data);

    // const filteredFaculties = applicantData.filter((category) =>
    //   data.selectedNames.includes(category.name)
    // );
    // setselectedApplicantData(filteredFaculties)

    setSelectedCourseID(data.selectedCourseID);
    setSelectedCourseName(data.selectedCourseName);
    console.log("coursename", data.selectedCourseName)
    fetchApplication(data.selectedCourseID)
    setStep(2);
  };

  //Take application details
  const [applicationData, setApplicationData] = useState();

  const fetchApplication = async (courseIDValue) => {
    try {
      const response = await fetch(`http://localhost:8080/application/get/${courseIDValue}`);

      if (response.ok) {
        const jsonData = await response.json();
        const applicationDataMap = jsonData.map(item => ({
          id: item.sdcApplicant.id,
          link: item.link,
          applicantEmail: item.sdcApplicant.email,
          applicantName: item.sdcApplicant.name,
        }));

        setApplicationData(applicationDataMap)
      }

      else {
        console.error("Failed to fetch data");
      }
    }

    catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <SDCNavbar />
      <div className="pb-20 p-5 select-none">
        {/* content goes inside this div */}

        <div className="container mx-auto p-4">
          <h1 className="text-2xl text-gray-800 font-bold mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">
            Send Applications for a new course
          </h1>

          <ApplicantForm1
            onSubmit={handleForm1Submit}
            dropdownCourses={courses}
            applicants={applicants}
          />

          {step === 2 ? <ApplicantForm2
            applicationData={applicationData}
            courseName={selectedCourseName} /> 
            : null
          }
        </div>
      </div>
    </>
  );
}
