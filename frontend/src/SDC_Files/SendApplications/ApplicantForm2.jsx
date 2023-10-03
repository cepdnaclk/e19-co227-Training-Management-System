import { TbSend } from "react-icons/tb";
import EmailTemplateToApplicants from "../Templates/CardTemplateToApplicants";

export default function ApplicantForm2({ applicationData, courseName }) {
  const mailSubject = `Requesting to enroll for the course: ${courseName}`

  const generateMailbody = (NameofApplicant, enrollmentlink) => {
    const mailBody =
      `Dear ${NameofApplicant},

Congratulations on your successful application to our ${courseName} course! To secure your spot, please click the enrollment link below:

${enrollmentlink}

Complete this process by the deadline to confirm your spot. If you have questions, contact us at.

We look forward to having you on board!

Best regards,
Staff Development Center`

    return mailBody
  }

  const sendMails = () => {

    const postData = applicationData.map(e => ({
      to: e.applicantEmail,
      body: generateMailbody(e.applicantName, e.link),
      subject: mailSubject,
    }));

    console.log(postData)

    fetch("http://localhost:8080/email/send", { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(postData) })
      .then(response => {
        console.log('POST response:', response.data);
        alert("Mails Sent")
      })

      .catch(error => {
        console.error('POST error:', error);
      });

  };

  return (
    <div>
      <p className="text-xl text-gray-700 font-bold mb-2">Applicants:</p>
      <div className="flex flex-col mt-0 pt-0">
        {
          applicationData && applicationData.map((e, index) => (
            <EmailTemplateToApplicants
              key={index}
              course={courseName}
              id={e.id}
              link={e.link}
              receiverName={e.applicantName}
              receiverMail={e.applicantEmail}
            />
          ))
        }
      </div>

      <div className="text-left">
        <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mt-4" onClick={sendMails}>
          <TbSend className="inline mr-2" />
          Send All
        </button>
      </div>

    </div>
  );
}
