package com.moodle.backend.controller;

import com.moodle.backend.entity.sdc_department;
import com.moodle.backend.service.sdc_department_service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/")
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class sdc_department_controller {
    @Autowired
    sdc_department_service sdcDepartmentService;

    @GetMapping("/department/get")
    public List<sdc_department> get() {
        return sdcDepartmentService.get();
    }

    @GetMapping("/department/get/{faculty_id}")
    public List<sdc_department> getByFacId(@PathVariable Long faculty_id) {
        return sdcDepartmentService.getByFacId(faculty_id);
    }

    @PostMapping("/department/save")
    public sdc_department save(@RequestBody sdc_department sdcDepartment) {
        return sdcDepartmentService.save(sdcDepartment);
    }

}
