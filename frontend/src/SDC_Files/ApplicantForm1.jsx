import React from "react";
import {useState} from "react";

const ApplicantForm1 = ({onSubmit, dropdownCourses}) => {
  const [selectedCourse, setSelectedCourse] = useState();

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({selectedCourse});
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Select course : dropdown */}
      <div className="mb-4">
        <select
          className="block w-full p-2 border rounded-lg"
          value={selectedCourse}
          onChange={handleCourseChange}
          required
        >
          <option value="" disabled defaultValue>
            Select a course
          </option>
          {dropdownCourses.map((course) => (
            <option key={course.courseID} value={course.CourseName}>
              {course.CourseName}
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
