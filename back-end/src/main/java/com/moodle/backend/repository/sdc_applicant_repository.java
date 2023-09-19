package com.moodle.backend.repository;

import com.moodle.backend.entity.sdc_applicant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface sdc_applicant_repository extends JpaRepository<sdc_applicant, Long> {
}
