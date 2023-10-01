import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SDCNavbar from '../SDCNavbar';

function ApplicantSave() {

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [deanData, setDeanData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    telephone: '',
    faculty: {
      id: 0
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFacultyChange = (e) => {
    setSelectedFaculty(e.target.value);
    formData.faculty.id = selectedFaculty;
  };

  console.log(selectedFaculty);

  // fetch faculty details
  const fetchDeanList = async () => {
    try {
      const responseDean = await fetch('http://localhost:8080/faculty/get');

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
    console.log('Form data submitted:', formData);
    const response = await axios.post('http://localhost:8080/applicant/save', formData);
    if(response.status == 200) {
      alert('form subission successful !');
    }
  };

  useEffect(() => {
    fetchDeanList();
  }, []);

  return (
    <>
      <SDCNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-gray-800 font-bold mt-5 marker:mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">Add New Lecturer</h1>
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md mt-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-100">
                Select a faculty:
              </label>
              <select
                className="block w-full text-gray-800 font-bold p-2 border rounded-lg"
                value={selectedFaculty}
                onChange={handleFacultyChange}
                required
              >
                <option value="" disabled defaultValue className='font-bold'>
                  Select a faculty
                </option>
                {deanData.map((faculty) => (
                  <option key={faculty.id} value={faculty.id} className='font-bold'>
                    {faculty.name}
                  </option>
                ))}
              </select>
              <label htmlFor="name" className="block">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 text-gray-800 font-bold py-2 border rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-800 font-bold border rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="designation" className="block">Designation:</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-800 font-bold border rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="telephone" className="block">Telephone:</label>
              <input
                type="text"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 text-gray-800 font-bold border rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <button type="submit" onClick={handleSubmit} className="w-1/4 bg-blue-400 font-bold text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ApplicantSave;