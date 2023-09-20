import React from "react";
import {useState, useEffect} from "react";

import SDCNavbar from "./SDCNavbar";

import ApplicantForm1 from "./ApplicantForm1";
import ApplicantForm2 from "./ApplicantForm2";

export default function CallingApplicants() {
  // Store all the courses: store courseID and courseName
  const [courses, setCourses] = useState([]);

  const [step, setStep] = useState(1);
  const [selectedCourseID, setSelectedCourseID] = useState();
  const [selectedCourseName, setSelectedCourseName] = useState();

  useEffect(() => {
    fetchCourses();
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

  //Check whether form 1 is submitted
  const handleForm1Submit = (data) => {
    //Set the course name and names of the faculties into local state

    setSelectedCourseID(data.selectedCourseID);
    setSelectedCourseName(data.selectedCourseName);
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
          <h1 className="text-2xl font-bold mb-4">
            Calling Applications for a new course
          </h1>

          <ApplicantForm1
            onSubmit={handleForm1Submit}
            dropdownCourses={courses}
          />

          {step === 2 ? <ApplicantForm2 applicationData={applicationData} courseName={selectedCourseName }/> : null}
        </div>
      </div>
    </>
  );
}
