package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_applicant;
import com.moodle.backend.entity.sdc_faculty;

import java.util.List;

public interface sdc_applicant_service {
    List<sdc_applicant> get();

    sdc_applicant save(sdc_applicant sdcApplicant);
}
