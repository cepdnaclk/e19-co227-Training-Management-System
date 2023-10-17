package com.moodle.backend.repository;

import com.moodle.backend.entity.sdc_department;
import com.moodle.backend.entity.sdc_faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface sdc_department_repository extends JpaRepository<sdc_department, Long> {
    public List<sdc_department> findByFacultyId(Long facultyId);
}
