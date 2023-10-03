import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SDCNavbar from '../SDCNavbar';
import { useNavigate } from 'react-router-dom';

function ApplicantSave() {

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setselectedDepartment] = useState("");
  const [deanData, setDeanData] = useState([]);
  const [hodData, setHodData] = useState([]);
  const [lecturerData, setLecturerData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    telephone: "",
    faculty: {
      id: 0
    },
    department: {
      id: 0
    }
  });

  const navigate = new useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFacultyChange = async (e) => {
    setSelectedFaculty(e.target.value);
    formData.faculty.id = e.target.value;
    try {
      const responseHod = await fetch('http://localhost:8080/department/get/' + e.target.value, { method: 'GET', redirect: 'follow', credentials: 'include' });
      if (responseHod.redirected) {
        document.location = responseHod.url;
      }
      if (responseHod.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (responseHod.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (responseHod.ok) {
        const jsonDataHod = await responseHod.json();
        setHodData(jsonDataHod);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDepartmentChange = async (e) => {
    setselectedDepartment(e.target.value);
    formData.department.id = e.target.value;
    const responseLec = await fetch('http://localhost:8080/applicant/get_by_fac_dep/' + selectedFaculty + '/' + e.target.value, { method: 'GET', redirect: 'follow', credentials: 'include' });
    try {
      if (responseLec.redirected) {
        document.location = responseLec.url;
      }
      if (responseLec.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (responseLec.status === 404) {
        console.log(selectedDepartment)
        navigate('/sdc/pageNotFound');
      }
      if (responseLec.ok) {
        setLecturerData([]);
        const jsonDataLec = await responseLec.json();
        setLecturerData(jsonDataLec);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }
      if (responseHod.ok) {
        const jsonDataHod = await responseHod.json();
        setHodData(jsonDataHod);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };


  // console.log(selectedFaculty); // for debugging
  console.log(selectedDepartment); // for debugging

  // fetch faculty details
  const fetchFacList = async () => {
    try {
      const responseDean = await fetch('http://localhost:8080/faculty/get', { method: 'GET', redirect: 'follow', credentials: 'include' });
      if (responseDean.redirected) {
        document.location = responseDean.url;
      }
      if (responseDean.status === 403) {
        navigate('/sdc/unAuthorized');
      }
      else if (responseDean.status === 404) {
        navigate('/sdc/pageNotFound');
      }
      if (responseDean.ok) {
        const jsonDataDean = await responseDean.json();
        setDeanData(jsonDataDean);
        //console.log("Dean Data:", jsonDataDean)
      } else {
        console.error('Failed to fetch data');
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Form data submitted:', formData);
    const response = await fetch('http://localhost:8080/applicant/save', 
    {method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include', body: JSON.stringify(formData)});
    console.log(response.data);
    if (response.status == 200) {
      alert('form subission successful !');
    } else {
      alert('form subission unsuccessful !');
    }
  };

  useEffect(() => {
    fetchFacList();
  }, []);

  return (
    <>
      <SDCNavbar />
      <div className="container mx-auto p-4">
        <div className="mx-auto p-2 text-gray-800 bg-slate-100 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2">
          <div className="mb-4 ml-2 mr-2">
            <label className="text-gray-800 font-medium">
              Select the faculty:
            </label>
            <select
              className="block w-full mt-1 text-gray-800 font-medium p-1 border rounded-lg focus:ring focus:ring-blue-500"
              value={selectedFaculty}
              onChange={handleFacultyChange}
              required
            >
              <option value="" disabled defaultValue className='font-medium'>
                Select the faculty
              </option>
              {deanData.map((faculty) => (
                <option key={faculty.id} value={faculty.id} className='font-medium'>
                  {faculty.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 ml-2 mr-2">
            <label className="text-gray-800 font-medium">
              Select the Department:
            </label>
            <select
              className="block w-full mt-1 text-gray-800 font-medium p-1 border rounded-lg focus:ring focus:ring-blue-500"
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              required
            >
              <option value="" disabled defaultValue className='font-medium'>
                Select the department
              </option>
              {hodData ? (
                hodData.map((department) => (
                  <option key={department.id} value={department.id} className='font-medium'>
                    {department.name}
                  </option>
                ))
              ) : (
                <option value="" className='font-medium'>
                  No departments available
                </option>
              )}
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
          <div>
            <h1 className="text-2xl font-bold mt-5 marker:mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">Add New Lecturer</h1>
            <div className="mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md mt-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-100 font-bold p-1">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 text-gray-800 font-medium py-1 border rounded-md focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-100 font-bold p-1">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-1 text-gray-800 font-medium border rounded-md focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="designation" className="block text-gray-100 font-bold p-1">Designation:</label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-1 text-gray-800 font-medium border rounded-md focus:ring focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="telephone" className="block text-gray-100 font-bold p-1">Telephone:</label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-1 text-gray-800 font-medium border rounded-md focus:ring focus:ring-blue-500"
                  />
                </div>
                <div>
                  <button type="submit" onClick={handleSubmit} className="w-1/4 bg-blue-400 font-medium text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className="row m-4">
            <h2 className='text-2xl text-center font-bold pt-2 pb-3 m-1 bg-amber-100 rounded-lg'>Already in the System</h2>
            <div className='grid mt-4 grid-cols-1 sm:grid-cols-2'>
              {lecturerData.map((lecturer) => (
                <div className='p-1 m-1 bg-gray-800 text-blue-300 font-medium text-center rounded-lg transition-transform transform hover:scale-105 hover:bg-slate-300 hover:text-gray-800' key={lecturer.id}>{lecturer.id} {lecturer.name}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicantSave;