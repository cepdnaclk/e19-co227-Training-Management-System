// imports
import axios from 'axios';
import SDCNavbar from '../SDCNavbar'
import { useEffect } from 'react';
import { useState } from 'react';
import { TbSend } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

// main function
const ApplicationCreate = () => {

  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [applicantsDoNotHaveApplications, setApplicantsDoNotHaveApplications] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [applications, setApplications] = useState([]);

  const navigate = new useNavigate();

  const handleCourseChange = async (e) => {
    const newCourseId = e.target.value;
    setSelectedCourseId(newCourseId);
    console.log(newCourseId); // Debugging: Check the new course ID

    try {
      const response = await fetch(
        'http://localhost:8080/applicant/get/' + newCourseId,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', applications);
    await axios.post('http://localhost:8080/application/save', applications);
    window.location.reload();
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const applicant_id = e.target.getAttribute('data-id');
    if (e.target.checked) {
      setSelectedNames((prevSelected) => [...prevSelected, name]);
      setApplications((prevApplications) => [...prevApplications, {
                                                                    deanAccept: "false",
                                                                    hodAccept: "false",
                                                                    sdcApplicant: {
                                                                      id: applicant_id
                                                                    },
                                                                    mdlCourse: {
                                                                      id: selectedCourseId
                                                                    }
                                                                  }]);

    } else {
      setSelectedNames((prevSelected) =>
        prevSelected.filter((n) => n !== name)
      );
      setApplications((prevApplications) =>
        prevApplications.filter((selected) => selected.sdcApplicant.id !== applicant_id)
      );
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNames([]);
      setApplications([]);
    } else {
      // adding applications objects to array
      const allApplicants = applicantsDoNotHaveApplications.map((applicant) => ({
        deanAccept: "false",
        hodAccept: "false",
        sdcApplicant: {
          id: applicant.id,
        },
        mdlCourse: {
          id: selectedCourseId,
        },
      }));
      setSelectedNames(applicantsDoNotHaveApplications.map((applicant) => applicant.name));
      setApplications(allApplicants);
    }
    setSelectAll(!selectAll);
  };

  console.log(applicantsDoNotHaveApplications)

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
          {/* For Debugging */}
          {/* {selectedCourseId}
          {applicantsDoNotHaveApplications.map((applicant) => (
            <option key={applicant.id} value={applicant.id}>
              {applicant.id} {applicant.name} 
            </option>
          ))} */}
        </div>

        <div className="flex flex-col mt-0 pt-0">
          {applicantsDoNotHaveApplications.map((name) => (
            <div
              key={name.name}
              className="mb-2 p-2 bg-gray-800 rounded-md shadow-xl transition-transform transform hover:scale-105"
            >
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-500"
                  value={name.name}
                  data-id={name.id}
                  onChange={handleNameChange}
                  checked={selectedNames.includes(name.name)}
                />
                <span className="ml-5 font-bold text-white">{name.name}</span>
                <span className="ml-5 mt-0 text-blue-400">{name.email}</span>
              </label>
            </div>
          ))}
          <div className='text-left'>
            <button
              type="button"
              className="bg-amber-600 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded mt-4"
              value="Select All"
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <button
              className="bg-green-700 ml-3 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={handleSubmit}
            >
              <TbSend className="inline mr-2" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

  </>)
}

export default ApplicationCreate