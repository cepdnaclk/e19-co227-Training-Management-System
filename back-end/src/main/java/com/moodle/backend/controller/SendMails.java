package com.moodle.backend.controller;

import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SendMails {
    @Autowired
    private JavaMailSender mailSender;

//    public void sendSimpleEmail(String toEmail,
//                                String subject,
//                                String body
//    ) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setFrom("jmeshangj@gmail.com");
//        message.setTo(toEmail);
//        message.setText(body);
//        message.setSubject(subject);
//        mailSender.send(message);
//        System.out.println("Mail Send...");
//
//    }

    public void sendSimpleEmail(String toEmail, String subject, String body) throws EmailException {
        HtmlEmail email = new HtmlEmail();
        email.setHostName("smtp.gmail.com"); // Set your SMTP server host
        email.setSmtpPort(587); // Set your SMTP server port
        email.setAuthenticator(new DefaultAuthenticator("jmeshangj@gmail.com", "enkf rlmo rztw knyl")); // Set your email and password
        email.setSSLOnConnect(true); // Use SSL for secure connection (optional)

        email.setFrom("jmeshangj@gmail.com");
        email.addTo(toEmail);
        email.setSubject(subject);
        email.setHtmlMsg(body);
        System.out.println("Mail Send...");
        email.send();
    }

}