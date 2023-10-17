package com.moodle.backend.controller;

import com.moodle.backend.entity.mdl_course;
import com.moodle.backend.service.mdl_course_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/course")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class mdl_course_controller {
    @Autowired
    mdl_course_service mdlCourseService;

    @GetMapping("/get_all")
    public List<mdl_course> getAll(){
        return mdlCourseService.getAll();
    }

    @GetMapping("/get")
    public List<mdl_course> get(){
        return mdlCourseService.get();
    }
}
