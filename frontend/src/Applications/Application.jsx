import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';


const Application = () => {
  const { course_id, applicant_id } = useParams();
  const [application, setApplication] = useState(null);

  const getApplications = async () => {
    try {
      const response = await fetch('http://localhost:8080/application/get/' + course_id + '/' + applicant_id);

      if (response.ok) {
        const jsonData = await response.json();
        setApplication(jsonData);
        console.log(jsonData);
      }

      else {
        console.error('Failed to fetch data');
      }
    }

    catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getApplications();
  }, [course_id, applicant_id]);

  const applicationJSON = JSON.stringify(application, null, 2);

  return (
    <>
      <div>
        <b><pre>Application:</pre></b>
        <pre>
          <code>{applicationJSON}</code>
        </pre>
      </div>
    </>
  )
}

export default Application