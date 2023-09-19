package com.moodle.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class mdl_course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "BIGINT")
    private Long id;

    @Column(name = "category", columnDefinition = "BIGINT")
    private Long category;

    @Column(name = "sortorder", columnDefinition = "BIGINT")
    private Long sortorder;

    @Column(name = "fullname", columnDefinition = "VARCHAR")
    private String fullname;

    @Column(name = "shortname", columnDefinition = "VARCHAR")
    private String shortname;

    @Column(name = "idnumber", columnDefinition = "VARCHAR")
    private String idnumber;

    @Column(name = "summary", columnDefinition = "LONGTEXT")
    private String summary;

    @Column(name = "summaryformat", columnDefinition = "TINYINT")
    private Integer summaryformat;

    @Column(name = "format", columnDefinition = "VARCHAR")
    private String format;

    @Column(name = "showgrades", columnDefinition = "TINYINT")
    private Integer showgrades;

    @Column(name = "newsitems", columnDefinition = "MEDIUMINT")
    private int newsitems;

    @Column(name = "startdate", columnDefinition = "BIGINT")
    private Long startdate;

    @Column(name = "enddate", columnDefinition = "BIGINT")
    private Long enddate;

    @Column(name = "relativedatesmode", columnDefinition = "TINYINT")
    private Integer relativedatesmode;

    @Column(name = "marker", columnDefinition = "BIGINT")
    private Long marker;

    @Column(name = "maxbytes", columnDefinition = "BIGINT")
    private Long maxbytes;

    @Column(name = "legacyfiles", columnDefinition = "SMALLINT")
    private int legacyfiles;

    @Column(name = "showreports", columnDefinition = "SMALLINT")
    private int showreports;

    @Column(name = "visible", columnDefinition = "TINYINT")
    private Integer visible;

    @Column(name = "visibleold", columnDefinition = "TINYINT")
    private Integer visibleold;

    @Column(name = "downloadcontent", columnDefinition = "TINYINT")
    private Integer downloadcontent;

    @Column(name = "groupmode", columnDefinition = "SMALLINT")
    private int groupmode;

    @Column(name = "groupmodeforce", columnDefinition = "SMALLINT")
    private int groupmodeforce;

    @Column(name = "defaultgroupingid", columnDefinition = "BIGINT")
    private Long defaultgroupingid;

    @Column(name = "lang", columnDefinition = "VARCHAR")
    private String lang;

    @Column(name = "calendartype", columnDefinition = "VARCHAR")
    private String calendartype;

    @Column(name = "theme", columnDefinition = "VARCHAR")
    private String theme;

    @Column(name = "timecreated", columnDefinition = "BIGINT")
    private Long timecreated;

    @Column(name = "timemodified", columnDefinition = "BIGINT")
    private Long timemodified;

    @Column(name = "requested", columnDefinition = "TINYINT")
    private Integer requested;

    @Column(name = "enablecompletion", columnDefinition = "TINYINT")
    private Integer enablecompletion;

    @Column(name = "completionnotify", columnDefinition = "TINYINT")
    private Integer completionnotify;

    @Column(name = "cacherev", columnDefinition = "BIGINT")
    private Long cacherev;

    @Column(name = "originalcourseid", columnDefinition = "BIGINT")
    private Long originalcourseid;

    @Column(name = "showactivitydates", columnDefinition = "TINYINT")
    private Integer showactivitydates;

    @Column(name = "showcompletionconditions", columnDefinition = "TINYINT")
    private Integer showcompletionconditions;

    @Column(name = "pdfexportfont", columnDefinition = "VARCHAR")
    private String pdfexportfont;
}
