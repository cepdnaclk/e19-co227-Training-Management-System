package com.moodle.backend.controller;

import com.moodle.backend.entity.sdc_faculty;
import com.moodle.backend.service.sdc_faculty_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faculty")
public class sdc_faculty_controller {
    @Autowired
    sdc_faculty_service sdcFacultyService;
    @GetMapping("/get")
    public List<sdc_faculty> get(){
        return sdcFacultyService.get();
    }

    @PostMapping("/save")
    public sdc_faculty save(@RequestBody sdc_faculty sdcFaculty){
        return sdcFacultyService.save(sdcFaculty);
    }
}
