import React from "react";
import {useState} from "react";

const ApplicantForm1 = ({onSubmit, dropdownCourses}) => {
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');

  const handleCourseChange = (e) => {
    const courseID = e.target.value
    const selectedCourse = dropdownCourses.find(course => course.courseID == courseID);

    setSelectedCourseID(courseID)
    setSelectedCourseName(selectedCourse.courseName);
    //console.log(selectedCourse.courseName)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ selectedCourseID, selectedCourseName });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Select course : dropdown */}
      <div className="mb-4">
        <select
          className="block w-full p-2 border rounded-lg"
          value={selectedCourseID}
          onChange={handleCourseChange}
          required
        >
          <option value="" disabled defaultValue>
            Select a course
          </option>
          {dropdownCourses.map((course) => (
            <option key={course.courseID} value={course.courseID}>
              {course.courseName}
            </option>
          ))}
        </select>
      </div>

      {/* Next Button    */}
      <div className="text-right">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default ApplicantForm1;
