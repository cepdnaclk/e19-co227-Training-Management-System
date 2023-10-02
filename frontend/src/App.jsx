// imports
import {Route, Routes} from "react-router-dom";
import UserRegistration from "./Register_Files/UserRegistration";
import SDCDashboard from "./SDC_Files/Dashboard/SDCDashboard";
import AnnounceCourse from "./SDC_Files/AnnounceCourses/AnnounceCourse";
import Application from "./SDC_Files/Applications/Application";
import CallingApplicants from "./SDC_Files/SendApplications/SendApplications";
import ApplicantSave from "./SDC_Files/AddLecturers/ApplicantSave";
import FacultySave from "./SDC_Files/Facuty/FacultySave";
import ApplicantCreate from "./SDC_Files/PrepareApplications/ApplicationCreate";
import PageNotFound404 from "./SDC_Files/PageNotFound404";
import AllApplications from "./SDC_Files/Applications/AllApplications";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/user/register" element={<UserRegistration />} />
        <Route path="/sdc/dashboard" element={<SDCDashboard />} />
        <Route path="/sdc/announce" element={<AnnounceCourse />} />
        <Route path="/sdc/invite" element={<CallingApplicants />} />
        <Route
          path="/sdc/application/:course_id/:applicant_id"
          element={<Application />}
        />
        <Route path="/sdc/applicant/save" element={<ApplicantSave />} />
        <Route path="/sdc/faculty/save" element={<FacultySave />} />
        <Route path="/sdc/application/create" element={<ApplicantCreate />} />
        <Route path="/sdc/pageNotFound" element={<PageNotFound404 />} />
        <Route path="/sdc/allApplications" element={<AllApplications />} />
      </Routes>
    </>
  );
}

export default App;
