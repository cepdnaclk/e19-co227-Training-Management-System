package com.moodle.backend.service;

import com.moodle.backend.entity.mdl_course;

import java.util.List;

public interface mdl_course_service {
    List<mdl_course> get();

    List<mdl_course> getAll();
}
