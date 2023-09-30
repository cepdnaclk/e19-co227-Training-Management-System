// main function
const EmailTemplateToAnnouncement = ({ deanName, deanMail }) => {

  return (
      <div>
        <label className="block text-white mb-2">Dean - {deanName}</label>
        <label className="block text-white mb-2">To  - {deanMail}</label>
      </div>
  );
}

export default EmailTemplateToAnnouncement;
