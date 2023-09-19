import React from "react";

export default function EmailTemplate({course, name}) {
  return (
    <div className="p-4 w-1/2 lg:w-2/6 mb-5">
      <div className="mb-4">
        <label className="block mb-2">Dean : </label>
        <label className="block text-gray-600 mb-2">To : </label>
        <div type="text" className="border rounded-md w-full py-1 px-3">
          {course}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Subject : </label>
        <div type="text" className="border rounded-md w-full py-1 px-3">
          {name}
        </div>
      </div>

      <div>
        <label className="block text-gray-600 mb-2">Body</label>
        <div className="border rounded-md w-full py-1 px-3 h-40">efvge</div>
      </div>
    </div>
  );
}
