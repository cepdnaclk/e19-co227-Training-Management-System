package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_applicant;
import com.moodle.backend.entity.sdc_application;

import java.util.List;

public interface sdc_application_service {
    List<sdc_application> get();

    String save(List<sdc_application> sdcApplications);

    List<sdc_application> getByCourseId(Long course_id);

    List<sdc_applicant> getApplicantsByCourseId(Long course_id);

    sdc_application getByCourseIdApplicantId(Long courseId, Long applicantId);

    sdc_application put(sdc_application sdcApplication, Long id);

    String delete(Long id);

}
