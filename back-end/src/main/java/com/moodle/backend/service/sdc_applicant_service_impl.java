package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_applicant;
import com.moodle.backend.entity.sdc_faculty;
import com.moodle.backend.repository.sdc_applicant_repository;
import com.moodle.backend.repository.sdc_faculty_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class sdc_applicant_service_impl implements sdc_applicant_service {
    @Autowired
    sdc_applicant_repository sdcApplicantRepository;

    public List<sdc_applicant> get() {
        return sdcApplicantRepository.findAll();
    }

    @Override
    public sdc_applicant save(sdc_applicant sdcApplicant) {
        return sdcApplicantRepository.save(sdcApplicant);
    }
}

