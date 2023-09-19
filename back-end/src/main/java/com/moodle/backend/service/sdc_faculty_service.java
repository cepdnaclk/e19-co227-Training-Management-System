package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_faculty;

import java.util.List;

public interface sdc_faculty_service {
    List<sdc_faculty> get();

    sdc_faculty save(sdc_faculty sdcFaculty);
}
