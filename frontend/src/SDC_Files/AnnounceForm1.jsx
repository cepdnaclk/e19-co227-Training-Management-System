import React, {useState} from "react";

const AnnounceForm1 = ({onSubmit}) => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedNames, setSelectedNames] = useState([]);

  const courses = ["Course 1", "Course 2", "Course 3", "Course 4"];
  const names = [
    "Name 1",
    "Name 2",
    "Name 3",
    "Name 4",
    "Name 5",
    "Name 6",
    "Name 7",
    "Name 8",
  ];

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedNames.length === 0) {
      alert("Select Email Recepients");
    } else {
      onSubmit({selectedCourse, selectedNames});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Select a course:
        </label>
        <select
          className="block w-full p-2 border rounded-lg"
          value={selectedCourse}
          onChange={handleCourseChange}
          required
        >
          <option value="" disabled defaultValue>
            Select a course
          </option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
      </div>
      <div>
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
      </div>
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

export default AnnounceForm1;
