// imports
import { useEffect, useState } from 'react'
import SDCNavbar from '../SDCNavbar'
import axios from 'axios';
import ConfirmationPopup from './../Templates/ConformationPopup';

const AllApplications = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [applicationId, setApplicationId] = useState("");

  const convertUnixToDateTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const formattedDate = date.toLocaleString(); // You can customize the formatting as needed

    return formattedDate;
  };

  const handleConfirm = async(confirmed, id) => {
    if (confirmed) {
      console.log('Deleted');
      try {
        const response = await axios.delete(`http://localhost:8080/application/delete/${applicationId}`);
        if (response.status === 200) {
          console.log('Application deleted successfully');
          // You can remove the console.log above and customize your success message as needed.

          // Refresh the applications by calling fetchApplications again
          fetchApplications();
        }
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    } else {
      console.log('Canceled');
    }
  };

  const fetchApplications = async () => {
    const response = await fetch('http://localhost:8080/application/get');
    if (response.ok) {
      const jsonData = await response.json();
      setApplications(jsonData);
      console.log(jsonData);
    }
  };

  const deleteApplication = async(id) => {
    setApplicationId(id);
    setIsPopupOpen(true);
  }

  useEffect(() => {
    fetchApplications();
  }, [])

  return (<>
    <SDCNavbar/>
    <div className="my-9 mx-12">
      <h1 className="text-2xl text-gray-800 font-bold mx-auto mb-3 text-center bg-amber-100 pt-2 pb-3 py-2 rounded-lg">
        Applications
      </h1>
      <div className="flex flex-col mt-0 pt-0">
        {applications.map((application) => (
          <div
            key={application.id}
            className="mb-2 p-2 bg-gray-800 rounded-md shadow-xl transition-transform transform hover:scale-105"
          >
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-500"
                value={application.application}
              />
              <span className="mx-5 font-bold text-white">Id - {application.id}</span>|
              <span className="mx-5 mt-0 text-blue-400">Course - {application.mdlCourse.fullname} (id:{application.mdlCourse.id})</span>|
              <span className="mx-5 mt-0 text-blue-400">Applicant - {application.sdcApplicant.name} (id:{application.sdcApplicant.id})</span>|
              <span className="mx-5 mt-0 text-blue-400">Start - {convertUnixToDateTime(application.mdlCourse.startdate).substring(0,10)}</span>|
              <span className="mx-5 mt-0 text-blue-400">Start - {convertUnixToDateTime(application.mdlCourse.enddate).substring(0, 10)}</span>
              <button 
                className='bg-red-500 px-2 py-1 rounded-lg hover:bg-red-800 transition-colors duration-300 text-white font-bold'
                onClick={() => deleteApplication(application.id)}
              >
                Delete
              </button>
            </label>
          </div>
        ))}
      </div>
    </div>
    <ConfirmationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onConfirm={handleConfirm} />
  </>)
}

export default AllApplications