import React, { useState, useEffect } from "react";
import axios from 'axios';

import { TbSend } from "react-icons/tb";

import EmailTemplateToApplicants from "./EmailTemplateToApplicants";

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

    axios.post("http://localhost:8080/email/send", postData)
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
      <div className="flex flex-wrap pt-5">
        {
          applicationData && applicationData.map((e, index) => (
             <EmailTemplateToApplicants key={index} mailSubject={mailSubject} mailbody={generateMailbody(e.applicantName, e.link)} receiverName={e.applicantName} receiverMail={e.applicantEmail}/>
          ))
        }
      </div>

      <div className="text-right">
        <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mt-4" onClick={sendMails}>
          <TbSend className="inline mr-2" />
          Send All
        </button>
      </div>

    </div>
  );
}
