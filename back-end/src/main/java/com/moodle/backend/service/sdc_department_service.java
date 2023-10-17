package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_department;
import com.moodle.backend.entity.sdc_faculty;

import java.util.List;

public interface sdc_department_service {
    List<sdc_department> get();
    List<sdc_department> getByFacId(Long facultyId);

    sdc_department save(sdc_department sdcFaculty);
}
