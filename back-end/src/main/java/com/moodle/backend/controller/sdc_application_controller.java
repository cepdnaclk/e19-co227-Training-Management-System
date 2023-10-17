package com.moodle.backend.controller;

import com.moodle.backend.config.OAuth2LoginSuccessHandler;
import com.moodle.backend.entity.sdc_application;
import com.moodle.backend.exception.Unauthorized403;
import com.moodle.backend.service.sdc_application_service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.apache.commons.mail.EmailException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/application")
public class sdc_application_controller {
    @Autowired
    sdc_application_service sdcApplicationService;

    @GetMapping("/get")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<sdc_application> get(){
        return sdcApplicationService.get();
    }

    @PutMapping("/put/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public sdc_application put(@RequestBody sdc_application sdcApplication, @PathVariable Long id){
        return sdcApplicationService.put(sdcApplication, id);
    }

    @GetMapping("/get/{course_id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public List<sdc_application> getByCourseId(@PathVariable Long course_id){
        return sdcApplicationService.getByCourseId(course_id);
    }

    @GetMapping("/get/{course_id}/{applicant_id}")
    public sdc_application getByCourseIdApplicantId(@PathVariable Long course_id, @PathVariable Long applicant_id){
        sdc_application sdcApplication = sdcApplicationService.getByCourseIdApplicantId(course_id, applicant_id);
        if(sdcApplication.getSdcApplicant().getEmail().equals(OAuth2LoginSuccessHandler.email)){
            return sdcApplication;
        } else {
            throw new Unauthorized403("unauthorized access");
        }
    }

    @PostMapping("/save")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String save(@RequestBody List<sdc_application> sdcApplications) {
        return sdcApplicationService.save(sdcApplications);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String delete(@PathVariable Long id) {
        return sdcApplicationService.delete(id);
    }

    @Autowired
    private SendMails senderService;

    @GetMapping("/email/send/{course_id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String sendMailsToApplicants(@PathVariable Long course_id) throws MessagingException, EmailException {
        List<sdc_application> applications = sdcApplicationService.getByCourseId(course_id);
        int noOfApplications = applications.size();
        List<String> emails = new ArrayList<>();
        List<String> links = new ArrayList<>();
        for (int i = 0; i < noOfApplications; i++) {
            emails.add(applications.get(i).getSdcApplicant().getEmail());
            links.add(applications.get(i).getLink());
        }

        for (int i = 0; i < noOfApplications; i++) {
            senderService.sendSimpleEmail(emails.get(i), "Link","This is email body : " + links.get(i));
        }
        return "Email sent...";
    }
}
