package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_department;
import com.moodle.backend.repository.sdc_department_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class sdc_department_service_impl implements sdc_department_service {
    @Autowired
    sdc_department_repository sdcDepartmentRepository;

    public List<sdc_department> get() {
        return sdcDepartmentRepository.findAll();
    }

    public List<sdc_department> getByFacId(Long facultyId) {
        return sdcDepartmentRepository.findByFacultyId(facultyId);
    }

    @Override
    public sdc_department save(sdc_department sdcFaculty) {
        return sdcDepartmentRepository.save(sdcFaculty);
    }
}

