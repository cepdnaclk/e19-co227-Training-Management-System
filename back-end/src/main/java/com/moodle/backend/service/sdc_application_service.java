package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_application;

import java.util.List;

public interface sdc_application_service {
    List<sdc_application> get();

    sdc_application save(sdc_application sdcApplication);

    sdc_application getByCourseId(Long course_id);

    sdc_application getByCourseIdApplicantId(Long courseId, Long applicantId);

    sdc_application put(sdc_application sdcApplication, Long id);
}
