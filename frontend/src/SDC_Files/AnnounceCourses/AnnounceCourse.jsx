// imports
import { useState, useEffect } from "react";
import AnnounceForm from "./AnnounceForm";
import SDCNavbar from "../SDCNavbar";

// main function
const AnnounceCourse = () => {

  // useStates
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedNames: [],
  });
  const [courses, setCourses] = useState([]);
  const [deanData, setDeanData] = useState([]);
  const [facultyName, setfacultyName] = useState([]);
  const [selectedDeanData, setSelectedDeanData] = useState([]);

  // functions

  // fetch new courses
  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/course/get');

      if (response.ok) {
        const jsonData = await response.json();
        const courseNames = jsonData.map((item) => item.fullname);
        setCourses(courseNames);
        //console.log("CourseData:",courseNames)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // fetch faculty details
  const fetchDeanList = async () => {
    try {
      const responseDean = await fetch('http://localhost:8080/faculty/get');

      if (responseDean.ok) {
        const jsonDataDean = await responseDean.json();
        const facultyNames = jsonDataDean.map((item) => item.name);
        setfacultyName(facultyNames)
        setDeanData(jsonDataDean);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Check whether form 1 is submitted
  const handleForm1Submit = (data) => {
    // Set the course name and names of the faculties into local state
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

  // function inside this calls only once
  useEffect(() => {
    fetchCourses();
    fetchDeanList();
  }, []);

  // html, css, js all together -> typeScript
  return (<>

    <SDCNavbar />
    <div className="pb-20 p-5 select-none">
      {/* content goes inside this div */}

      <div className="container mx-auto p-4">

        <h1 className="text-2xl text-gray-800 font-bold mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">
          Announce new course
        </h1>

        <AnnounceForm
          onSubmit={handleForm1Submit}
          dropdownCourses={courses}
          facultyName={facultyName}
          deanData={deanData}
          selectedDeanData={selectedDeanData}
        />

      </div>
    </div>

  </>);
}

export default AnnounceCourse;
