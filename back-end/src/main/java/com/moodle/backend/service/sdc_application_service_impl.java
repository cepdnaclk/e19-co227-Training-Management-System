package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_applicant;
import com.moodle.backend.entity.sdc_application;
import com.moodle.backend.repository.sdc_application_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class sdc_application_service_impl implements sdc_application_service {
    @Autowired
    sdc_application_repository sdcApplicationRepository;

    public List<sdc_application> get() {
        return sdcApplicationRepository.findAll();
    }

    @Override
    public String save(List<sdc_application> sdcApplications) {
        for (sdc_application sdcApplication : sdcApplications) {
            sdcApplication.setLink("http://localhost:5173/sdc/application/" + sdcApplication.getMdlCourse().getId() + "/" + sdcApplication.getSdcApplicant().getId());
            sdcApplicationRepository.save(sdcApplication);
        }
        return "Save Successful";
    }

    @Override
    public List<sdc_application> getByCourseId(Long course_id) {
        return sdcApplicationRepository.findByMdlCourseId(course_id);
    }

    @Override
    public List<sdc_applicant> getApplicantsByCourseId(Long course_id) {
        List<sdc_application> sdcApplications = sdcApplicationRepository.findByMdlCourseId(course_id);
        List<sdc_applicant> applicantsHaveApplications = new ArrayList<>();
        for (sdc_application sdcApplication : sdcApplications) {
            applicantsHaveApplications.add(sdcApplication.getSdcApplicant());
        }
        return applicantsHaveApplications;
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
        return sdcApplicationRepository.save(sdcApplicationDB);
    }

    @Override
    public String delete(Long id) {
        sdcApplicationRepository.deleteById(id);
        return "deleted";
    }

}

