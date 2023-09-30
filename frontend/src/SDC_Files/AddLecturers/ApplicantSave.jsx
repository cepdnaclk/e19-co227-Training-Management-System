import axios from 'axios';
import React, { useState } from 'react';
import SDCNavbar from '../SDCNavbar';

function ApplicantSave() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    telephone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    await axios.post('http://localhost:8080/applicant/save', formData);
  };

  return (
    <>
      <SDCNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-gray-800 font-bold mt-5 marker:mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">Add New Lecturer</h1>
        <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md mt-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
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
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
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
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
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
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-500"
              />
            </div>
            <div>
              <button type="submit" className="w-1/4 bg-blue-500 font-bold text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ApplicantSave;