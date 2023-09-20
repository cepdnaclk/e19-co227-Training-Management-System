import React, { useState, useEffect } from 'react';
import axios from 'axios';

import EmailTemplate from "./EmailTemplate";

import {TbSend} from "react-icons/tb";

const AnnounceForm2 = ({ selectedCourse, deanData }) => {

  const mailSubject = `Requesting Nominee List for the course: ${selectedCourse}`

  const mailbody =
  `Dear Sir/Madam,
  
We're gearing up for an upcoming course: ${selectedCourse} and need the nominee list from your department or college. Please share this information by (date)

Required Details:
    Full Name
    Department of the nominee
    Contact Info: Email and Phone
    Designation
          
Your prompt response will help us make necessary arrangements for the course.

Feel free to contact us if you have any questions.

Thank you for your cooperation.
      
Best regards,
Staff Development Center
`

  const sendMails = () => {
    
    const postData = deanData.map(dean => ({
      to: dean.email,
      body: mailbody, 
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
          deanData.map((e) => (
            <EmailTemplate key={e.id} mailSubject={mailSubject} mailbody={mailbody} facName={e.name} deanName={e.deanname} deanMail={e.email} />
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
};

export default AnnounceForm2;
