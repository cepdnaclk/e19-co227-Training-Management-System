package com.moodle.backend.repository;

import com.moodle.backend.entity.mdl_course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface mdl_course_repository extends JpaRepository<mdl_course, Long> {
}
