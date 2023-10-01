// imports
import { useState } from 'react';
import { TbSend } from "react-icons/tb";
import axios from 'axios';
import TileMapper from '../Templates/TileMapper';

// main function
const AnnounceForm1 = ({ onSubmit, dropdownCourses, facultyName, deanData, selectedDeanData }) => {

  // useStates
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // constants
  const names = facultyName;
  const mailSubject = `Requesting Nominee List for the course: ${selectedCourse}`;
  const mailbody =
    `
    Dear Sir/Madam,
  
    We're gearing up for an upcoming course: ${selectedCourse} and need the nominee list from your department or college. Please share this information by (date)

    Required Details:
        Full Name
        Department of the nominee
        Contact Info: Email and Phone
        Designation
              
    Your prompt response will help us make necessary arrangements for the course.

    Feel free to contact us if you have any questions.

    Thank you for your cooperation.
          
    Best regards,
    Staff Development Center
    `;

  // functions
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
      onSubmit({ selectedCourse, selectedNames });
    }
  };

  const sendMails = () => {
    const postData = selectedDeanData.map(dean => ({
      to: dean.email,
      body: mailbody,
      subject: mailSubject,
    }));

    console.log(postData)

    axios.post("http://localhost:8080/email/send", postData)
      .then(response => {
        console.log('POST response:', response.data);
        alert("Mails Sent")
      })

      .catch(error => {
        console.error('POST error:', error);
      });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedNames([]);
    } else {
      const allNames = deanData.map((name) => name.name);
      setSelectedNames(allNames);
    }
    setSelectAll(!selectAll);
  };

  // html, css, js all together -> typeScript
  return (
    <form onSubmit={handleSubmit}>

      <div className="mb-4">

        <label className="text-xl block text-gray-700 font-bold mb-2">
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
          {dropdownCourses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

      </div>

      <div>
        <p className="text-xl text-gray-700 font-bold mb-2">Select Faculties:</p>
        <TileMapper data={deanData} handleChange={handleNameChange} selected={selectedNames} />
      </div>

      <div className="text-left">
        <button
          type="button"
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-400 ease-in-out hover:bg-blue-800"
          value="Select All"
          onClick={handleSelectAll}
        >
          {!selectAll ? "Select All" : "Deselect All"}
        </button>
        <button
          className="bg-green-700 ml-3 text-white font-bold py-2 px-4 rounded mt-4 transition-colors duration-400 ease-in-out hover:bg-green-900"
          onClick={sendMails}
        >
          <TbSend className="inline mr-2" />
          Send
        </button>
      </div>
      
    </form>
  );
};

export default AnnounceForm1;
