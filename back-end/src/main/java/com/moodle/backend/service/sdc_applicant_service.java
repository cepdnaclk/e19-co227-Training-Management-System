package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_applicant;
import com.moodle.backend.entity.sdc_faculty;

import java.util.List;

public interface sdc_applicant_service {
    List<sdc_applicant> get();

    sdc_applicant save(sdc_applicant sdcApplicant);

    List<sdc_applicant> getNotCreated(Long courseId);

    List<sdc_applicant> getByFaculty(Long facultyId);

    List<sdc_applicant> getByFacultyDepartment(Long facultyId, Long departmentId);

    sdc_applicant findbyEmail(String email);
}
