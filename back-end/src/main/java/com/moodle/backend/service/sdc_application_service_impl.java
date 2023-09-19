package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_application;
import com.moodle.backend.repository.sdc_application_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class sdc_application_service_impl implements sdc_application_service {
    @Autowired
    sdc_application_repository sdcApplicationRepository;

    public List<sdc_application> get() {
        return sdcApplicationRepository.findAll();
    }

    @Override
    public sdc_application save(sdc_application sdcApplication) {
        sdcApplication.setLink("http://localhost:8080/application/get/" + sdcApplication.getMdlCourse().getId() + "/" + sdcApplication.getSdcApplicant().getId());
        return sdcApplicationRepository.save(sdcApplication);
    }

    @Override
    public sdc_application getByCourseId(Long course_id) {
        return sdcApplicationRepository.findByMdlCourseId(course_id);
    }

    @Override
    public sdc_application getByCourseIdApplicantId(Long courseId, Long applicantId) {
        return sdcApplicationRepository.findByMdlCourseIdAndSdcApplicantId(courseId, applicantId);
    }

    @Override
    public sdc_application put(sdc_application sdcApplication, Long id) {
        sdc_application sdcApplicationDB = sdcApplicationRepository.findById(id).get();
        sdcApplicationDB.setSdcApplicant(sdcApplication.getSdcApplicant());
        sdcApplicationDB.setLink(sdcApplication.getLink());
        sdcApplicationDB.setDeanAccept(sdcApplication.getDeanAccept());
        sdcApplicationDB.setMdlCourse(sdcApplication.getMdlCourse());
        sdcApplicationDB.setHodAccept(sdcApplication.getHodAccept());
        sdcApplicationDB.setQualification(sdcApplication.getQualification());
        return sdcApplicationRepository.save(sdcApplicationDB);
    }
}

