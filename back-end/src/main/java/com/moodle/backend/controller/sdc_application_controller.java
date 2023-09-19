package com.moodle.backend.controller;

import com.moodle.backend.entity.sdc_application;
import com.moodle.backend.service.sdc_application_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/application")
public class sdc_application_controller {
    @Autowired
    sdc_application_service sdcApplicationService;

    @GetMapping("/get")
    public List<sdc_application> get(){
        return sdcApplicationService.get();
    }

    @PutMapping("/put/{id}")
    public sdc_application put(@RequestBody sdc_application sdcApplication, @PathVariable Long id){
        return sdcApplicationService.put(sdcApplication, id);
    }

    @GetMapping("/get/{course_id}")
    public sdc_application getByCourseId(@PathVariable Long course_id){
        return sdcApplicationService.getByCourseId(course_id);
    }

    @GetMapping("/get/{course_id}/{applicant_id}")
    public sdc_application getByCourseIdApplicantId(@PathVariable Long course_id, @PathVariable Long applicant_id){
        return sdcApplicationService.getByCourseIdApplicantId(course_id, applicant_id);
    }

    @PostMapping("/save")
    public sdc_application save(@RequestBody sdc_application sdcApplication) {
        return sdcApplicationService.save(sdcApplication);
    }
}
