import React, { useState, useEffect } from "react";

import AnnounceForm1 from "./AnnounceForm1";
import AnnounceForm2 from "./AnnounceForm2";

import SDCNavbar from "./SDCNavbar";

export default function AnnounceCourse() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedNames: [],
  });

  //Take Courses to display in the dropdown menu
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchDeanList();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/course/get');

      if (response.ok) {
        const jsonData = await response.json();
        const courseNames = jsonData.map((item) => item.fullname);
        setCourses(courseNames);
        //console.log("CourseData:",courseNames)
      }

      else {
        console.error('Failed to fetch data');
      }
    }

    catch (error) {
      console.error('Error:', error);
    }

  };

  //Take Courses to display in the dropdown menu
  const [deanData, setDeanData] = useState([]);
  const [facultyName, setfacultyName] = useState([]);

  const fetchDeanList = async () => {
    try {
      const responseDean = await fetch('http://localhost:8080/faculty/get');

      if (responseDean.ok) {
        const jsonDataDean = await responseDean.json();
        const facultyNames = jsonDataDean.map((item) => item.name);
        setfacultyName(facultyNames)
        setDeanData(jsonDataDean);
        //console.log("Dean Data:", jsonDataDean)
      }

      else {
        console.error('Failed to fetch data');
      }
    }

    catch (error) {
      console.error('Error:', error);
    }

  };

  const [selectedDeanData, setSelectedDeanData] = useState([]);

  //Check whether form 1 is submitted
  const handleForm1Submit = (data) => {
    //Set the course name and names of the faculties into local state
    setFormData(data);
    
    // Filter data from the array containing all dean details
    // Filter based on the selectedNames in the formData
    // selectedNames are the names that tick/mark in the form
    const filteredFaculties = deanData.filter((category) =>
      data.selectedNames.includes(category.name)
    );
    setSelectedDeanData(filteredFaculties)

    setStep(2);
  };

  const handleForm2Submit = () => {
    // Handle submission of Form 2 data here
    // You can access formData.selectedCourse and formData.selectedNames
    // and submit it to your server or perform any necessary action.
  };

  return (
    <>
      <SDCNavbar />
      <div className="pb-20 p-5 select-none">
        {/* content goes inside this div */}

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Announce a new course</h1>

          <AnnounceForm1 onSubmit={handleForm1Submit} dropdownCourses={courses} facultyName={facultyName} />

          {step === 2 ? (
            <AnnounceForm2
              selectedCourse={formData.selectedCourse}
              deanData={selectedDeanData}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
