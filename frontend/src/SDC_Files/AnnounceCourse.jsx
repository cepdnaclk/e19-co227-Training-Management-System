import React, {useState} from "react";

import AnnounceForm1 from "./AnnounceForm1";
import AnnounceForm2 from "./AnnounceForm2";

import SDCNavbar from "./SDCNavbar";

export default function AnnounceCourse() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedCourse: "",
    selectedNames: [],
  });

  const handleForm1Submit = (data) => {
    setFormData(data);
    setStep(2);
  };

  const handleForm2Submit = () => {
    // Handle submission of Form 2 data here
    // You can access formData.selectedCourse and formData.selectedNames
    // and submit it to your server or perform any necessary action.
  };

  return (
    <>
      <SDCNavbar />
      <div className="pb-20 p-5 select-none">
        {/* content goes inside this div */}

        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Announce a new course</h1>

          <AnnounceForm1 onSubmit={handleForm1Submit} />

          {step === 2 ? (
            <AnnounceForm2
              selectedCourse={formData.selectedCourse}
              selectedNames={formData.selectedNames}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
