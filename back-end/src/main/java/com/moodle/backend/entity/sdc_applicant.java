package com.moodle.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class sdc_applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    String email;
    String designation;
    String telephone;
    @ManyToOne
    sdc_faculty faculty;
    @ManyToOne
    sdc_department department;
}
