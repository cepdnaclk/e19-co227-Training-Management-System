import React from "react";

import EmailTemplate from "./EmailTemplate";

import {TbSend} from "react-icons/tb";

const AnnounceForm2 = ({selectedCourse, selectedNames}) => {
  return (
    <div>
      {console.log(selectedCourse)}
      {console.log(selectedNames)}

      <div className="flex flex-wrap pt-5">
        {selectedNames.map((name) => (
          <EmailTemplate key={name} course={selectedCourse} name={name} />
        ))}
      </div>

      <div className="text-right">
        <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mt-4">
          <TbSend className="inline mr-2" />
          Send All
        </button>
      </div>
    </div>
  );
};

export default AnnounceForm2;
