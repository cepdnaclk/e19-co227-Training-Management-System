// imports
import {useState} from "react";

// main function
const CardTemplateToApplicants = ({ course, id, link, receiverName, receiverMail }) =>  {

  // useStates
  const [show, setShow] = useState(false);

  // Functions
  const handleClick = () => {
    setShow(!show);
    console.log(show);
  }

  // html, css, js all together -> typeScript
  return (
    <div className="mb-2 p-2 bg-gray-800 rounded-md shadow-xl transition-transform transform hover:scale-105">
      <div>
          <label className="block text-white font-bold">[{id}] {receiverName}
            <button
              className="ml-2 text-white bg-blue-700 hover:bg-blue-900 py-1 px-1 pt-0 pb-0 rounded"
              onClick={handleClick}
            >
              {!show ? "Show" : "Hide"}
            </button>
          </label>
          {show ? 
            <div className="mt-2 ml-6">
              <label className="block text-white"><b>Email</b>  - {receiverMail}</label>
              <label className="block text-white"><b>Course</b> - {course}</label>
              <label className="block text-white"><b>Link to the Application</b> - {link}</label>
            </div>
            : null
          }
      </div>
    </div>
  );
}

export default CardTemplateToApplicants;