// imports
import { useEffect, useState } from 'react'
import SDCNavbar from '../SDCNavbar'

const AllApplications = () => {

  const convertUnixToDateTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    const formattedDate = date.toLocaleString(); // You can customize the formatting as needed

    return formattedDate;
  };

  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    const response = await fetch('http://localhost:8080/application/get');
    if (response.ok) {
      const jsonData = await response.json();
      setApplications(jsonData);
      console.log(jsonData);
    }
  }

  useEffect(() => {
    fetchApplications();
  }, [])

  return (<>
    <SDCNavbar/>
    <div>AllApplications</div>
    {applications.map((application) => (
      <div className="m-4" key={application.id}>
        {application.id} -- {application.sdcApplicant.id} -- {application.sdcApplicant.name} -- {application.mdlCourse.fullname} -- {convertUnixToDateTime(application.mdlCourse.startdate)} -- {convertUnixToDateTime(application.mdlCourse.enddate)} -- 
      </div>
    ))}
  </>)
}

export default AllApplications