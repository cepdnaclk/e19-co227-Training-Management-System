package com.moodle.backend.repository;

import com.moodle.backend.entity.sdc_application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface sdc_application_repository extends JpaRepository<sdc_application, Long> {
    public List<sdc_application> findByMdlCourseId(Long course_id);

    public sdc_application findByMdlCourseIdAndSdcApplicantId(Long course_id, Long applicant_id);


}
