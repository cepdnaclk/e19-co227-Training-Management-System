import React from "react";

export default function EmailTemplate({ mailSubject ,mailbody, facName, deanName, deanMail }) {

  return (
    <div className="p-4 w-1/2 lg:w-2/6 mb-5">
      <div className="mb-4">
        <label className="block mb-2">Dean : {deanName}</label>
        <label className="block mb-2">Faculty : {facName}</label>
        <label className="block text-gray-600 mb-2">To : </label>
        <div type="text" className="border rounded-md w-full py-1 px-3">
          <span>{deanMail}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Subject : </label>
        <div type="text" className="border rounded-md w-full py-1 px-3">
          {mailSubject}
        </div>
      </div>

      <div>
        <label className="block text-gray-600 mb-2">Body</label>
        <div className="border rounded-md w-full py-1 px-3 h-full">
          {mailbody.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
