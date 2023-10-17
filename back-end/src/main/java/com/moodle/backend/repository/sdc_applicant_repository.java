package com.moodle.backend.repository;

import com.moodle.backend.entity.sdc_applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface sdc_applicant_repository extends JpaRepository<sdc_applicant, Long> {
    List<sdc_applicant> findByFacultyId(Long id);
    List<sdc_applicant> findByFacultyIdAndDepartmentId(Long facultyId, Long departmentId);
    sdc_applicant findByEmail(String email);
}
