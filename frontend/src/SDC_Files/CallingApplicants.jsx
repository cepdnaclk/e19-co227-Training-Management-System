import React from "react";
import {useState} from "react";

import SDCNavbar from "./SDCNavbar";

import ApplicantForm1 from "./ApplicantForm1";
import ApplicantForm2 from "./ApplicantForm2";

export default function CallingApplicants() {
  // Store all the courses: store courseID and courseName
  const [courses, setCourses] = useState([]);

  const [step, setStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);

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
          CourseName: item.fullname,
        }));
        setCourses(courseData);
        console.log("CourseData:", courseData);
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
    setSelectedCourse(data);

    console.log(data);

    setStep(2);
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

          {step === 2 ? <ApplicantForm2 /> : null}
        </div>
      </div>
    </>
  );
}
