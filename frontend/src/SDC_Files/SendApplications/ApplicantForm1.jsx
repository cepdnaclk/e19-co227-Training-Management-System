import {useState} from "react";

const ApplicantForm1 = ({onSubmit, dropdownCourses, applicants}) => {
  const [selectedCourseID, setSelectedCourseID] = useState('');
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [selectedNames, setSelectedNames] = useState([]);

  console.log(applicants);
  const names = applicants;


  const handleNameChange = (e) => {
    const name = e.target.value;
    if (e.target.checked) {
      setSelectedNames((prevSelected) => [...prevSelected, name]);
    } else {
      setSelectedNames((prevSelected) =>
        prevSelected.filter((n) => n !== name)
      );
    }
  };

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

  return (<>
    <p className="text-xl text-gray-700 font-bold mb-2">Select a Course:</p>
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
      {/* <div>
        <p className="text-gray-700 text-sm font-bold mb-2">Select names:</p>
        {names.map((name) => (
          <div key={name} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                value={name}
                onChange={handleNameChange}
                checked={selectedNames.includes(name)}
              />
              <span className="ml-2">{name}</span>
            </label>
          </div>
        ))}
      </div> */}
      {/* Next Button    */}
      <div className="text-left mb-8">
        <button
          type="submit"

          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-0"
        >
          Next
        </button>
      </div>
    </form>
  </>
  );
};

export default ApplicantForm1;
