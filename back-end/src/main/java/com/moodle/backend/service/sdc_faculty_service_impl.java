package com.moodle.backend.service;

import com.moodle.backend.entity.sdc_faculty;
import com.moodle.backend.repository.sdc_faculty_repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class sdc_faculty_service_impl implements sdc_faculty_service {
    @Autowired
    sdc_faculty_repository sdcFacultyRepository;

    public List<sdc_faculty> get() {
        return sdcFacultyRepository.findAll();
    }

    @Override
    public sdc_faculty save(sdc_faculty sdcFaculty) {
        return sdcFacultyRepository.save(sdcFaculty);
    }
}

