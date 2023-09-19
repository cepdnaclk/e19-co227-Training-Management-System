package com.moodle.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class sdc_application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String qualification;
    Boolean deanAccept;
    Boolean hodAccept;
    String link;
    @ManyToOne
    sdc_applicant sdcApplicant;
    @ManyToOne
    mdl_course mdlCourse;
    @Column(nullable = true, length = 64)
    String bankSlip;
}
