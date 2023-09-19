package com.moodle.backend.controller;

import com.moodle.backend.entity.mdl_course;
import com.moodle.backend.service.mdl_course_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class mdl_course_controller {
    @Autowired
    mdl_course_service mdlCourseService;
    @GetMapping("/get")
    public List<mdl_course> get(){
        return mdlCourseService.get();
    }
}
