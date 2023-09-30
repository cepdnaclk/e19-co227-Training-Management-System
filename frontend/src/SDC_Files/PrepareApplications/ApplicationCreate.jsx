// imports
import SDCNavbar from '../SDCNavbar'
import { useEffect } from 'react';
import { useState } from 'react';

// main function
const ApplicationCreate = () => {

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [applicantsDoNotHaveApplications, setApplicantsDoNotHaveApplications] = useState([]);
  const [courses, setCourses] = useState([]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
    console.log(e.target.value)
    getApplicants();
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8080/course/get');

      if (response.ok) {
        const jsonData = await response.json();
        const courseNamesWithIds = jsonData.map((item) => ({
          id: item.id,
          name: item.fullname,
        }));
        setCourses(courseNamesWithIds);
        //console.log("CourseData:",courseNames)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getApplicants = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/applicant/get/' + selectedCourseId,
      );

      if (response.ok) {
        const jsonData = await response.json();
        setApplicantsDoNotHaveApplications(jsonData);
        console.log(jsonData);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (<>
    <SDCNavbar/>
    <div className="pb-20 p-5 select-none">
      {/* content goes inside this div */}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-gray-800 font-bold mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">
          Prepare Applications
        </h1>

        <div className="mb-4">
          <label className="text-xl block text-gray-700 font-bold mb-2">
            Select a course:
          </label>

          <select
            className="block w-full p-2 border rounded-lg"
            value={selectedCourseId}
            onChange={handleCourseChange}
            required
          >
            <option value="" disabled defaultValue>
              Select a course
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xl block text-gray-700 font-bold mb-2">
            Prepare Applications for:
          </label>
          {selectedCourseId}
          {applicantsDoNotHaveApplications.map((applicant) => (
            <option key={applicant.id} value={applicant.id}>
              {applicant.id} {applicant.name} 
            </option>
          ))}
        </div>

      </div>
    </div>

  </>)
}

export default ApplicationCreate