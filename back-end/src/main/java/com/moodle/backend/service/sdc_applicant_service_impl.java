package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_applicant;
import com.moodle.backend.entity.sdc_faculty;
import com.moodle.backend.repository.sdc_applicant_repository;
import com.moodle.backend.repository.sdc_faculty_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class sdc_applicant_service_impl implements sdc_applicant_service {
    @Autowired
    sdc_applicant_repository sdcApplicantRepository;
    @Autowired
    sdc_faculty_repository sdcFacultyRepository;

    @Autowired
    sdc_application_service sdcApplicationService;

    public List<sdc_applicant> get() {
        return sdcApplicantRepository.findAll();
    }

    @Override
    public sdc_applicant save(sdc_applicant sdcApplicant) {
        return sdcApplicantRepository.save(sdcApplicant);
    }

    @Override
    public List<sdc_applicant> getNotCreated(Long courseId) {
        List<sdc_applicant> applicants1 = sdcApplicantRepository.findAll();
        List<sdc_applicant> applicants2 = sdcApplicationService.getApplicantsByCourseId(courseId);
        List<sdc_applicant> newApplicantList = new ArrayList<>();
        for(sdc_applicant sdcApplicant1 : applicants1){
            int count = 0;
            for(sdc_applicant sdcApplicant2 : applicants2){
                if(sdcApplicant1.getId() == sdcApplicant2.getId()) {
                    count++;
                }
            }
            if (count == 0) {
                newApplicantList.add(sdcApplicant1);
            }
        }
        return newApplicantList;
    }

    @Override
    public List<sdc_applicant> getByFaculty(Long facultyId) {
        return sdcApplicantRepository.findByFacultyId(facultyId);
    }

    @Override
    public List<sdc_applicant> getByFacultyDepartment(Long facultyId, Long departmentId) {
        return sdcApplicantRepository.findByFacultyIdAndDepartmentId(facultyId, departmentId);
    }

    @Override
    public sdc_applicant findbyEmail(String email) {
        return sdcApplicantRepository.findByEmail(email);
    }

}

