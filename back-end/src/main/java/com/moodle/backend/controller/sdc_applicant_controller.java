package com.moodle.backend.controller;

import com.moodle.backend.entity.sdc_applicant;
import com.moodle.backend.service.sdc_applicant_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/applicant")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class sdc_applicant_controller {
    @Autowired
    sdc_applicant_service sdcApplicantService;

    @GetMapping("/get")
    public List<sdc_applicant> get(){
        return sdcApplicantService.get();
    }

    @GetMapping("/get/{course_id}")
    public List<sdc_applicant> getNotCreated(@PathVariable Long course_id){
        return sdcApplicantService.getNotCreated(course_id);
    }

    @GetMapping("/get_by_fac/{faculty_id}")
    public List<sdc_applicant> getByFaculty(@PathVariable Long faculty_id){
        return sdcApplicantService.getByFaculty(faculty_id);
    }

    @GetMapping("/get_by_fac_dep/{faculty_id}/{department_id}")
    public List<sdc_applicant> getByFacultyDepartment(@PathVariable Long faculty_id, @PathVariable Long department_id){
        return sdcApplicantService.getByFacultyDepartment(faculty_id, department_id);
    }

    @PostMapping("/save")
    public sdc_applicant save(@RequestBody sdc_applicant sdcApplicant){
        return sdcApplicantService.save(sdcApplicant);
    }
}
