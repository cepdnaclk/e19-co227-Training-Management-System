package com.moodle.backend.repository;

import com.moodle.backend.entity.sdc_faculty;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface sdc_faculty_repository extends JpaRepository<sdc_faculty, Long> {
}
