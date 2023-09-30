import axios from 'axios';
import React, { useState } from 'react';

function FacultySave() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    deanname: ''
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
    await axios.post('http://localhost:8080/faculty/save', formData);
  };

  return (
    <div>
      <h2>Save Faculty</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deanname">Dean Name:</label>
          <input
            type="text"
            id="deanname"
            name="deanname"
            value={formData.deanname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default FacultySave;