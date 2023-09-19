package com.moodle.backend.controller;

import com.moodle.backend.entity.sdc_applicant;
import com.moodle.backend.service.sdc_applicant_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applicant")
public class sdc_applicant_controller {
    @Autowired
    sdc_applicant_service sdcApplicantService;
    @GetMapping("/get")
    public List<sdc_applicant> get(){
        return sdcApplicantService.get();
    }

    @PostMapping("/save")
    public sdc_applicant save(@RequestBody sdc_applicant sdcApplicant){
        return sdcApplicantService.save(sdcApplicant);
    }
}
