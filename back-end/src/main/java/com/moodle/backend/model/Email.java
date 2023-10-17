package com.moodle.backend.model;

import lombok.Data;

@Data
public class Email {
    String to;
    String subject;
    String body;
}
