package com.moodle.backend.service;

import com.moodle.backend.entity.mdl_course;
import com.moodle.backend.repository.mdl_course_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.moodle.backend.generator.Gen.dateGenerator;

@Service
public class mdl_course_service_impl implements mdl_course_service {
    @Autowired
    mdl_course_repository mdlCourseRepository;

    public List<mdl_course> get() {
        List<mdl_course> courses = mdlCourseRepository.findAll();

        for (mdl_course course : courses) {
            // Check if any specific property (e.g., name) is null
            course.setDownloadcontent(0);
            course.setOriginalcourseid(0L);
            course.setPdfexportfont("");
            course.setShowcompletionconditions(1);
        }

        List<mdl_course> courseList = new ArrayList<>();

        for (mdl_course course: courses){
            if(course.getStartdate() > dateGenerator()) {
                courseList.add(course);
            }
        }

        return courseList;
    }

    @Override
    public List<mdl_course> getAll() {
        List<mdl_course> courses = mdlCourseRepository.findAll();
        courses.remove(0); // avoid sending top-level course in moodle
        return courses;
    }
}

