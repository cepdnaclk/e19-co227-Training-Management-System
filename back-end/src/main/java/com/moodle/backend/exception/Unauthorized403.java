package com.moodle.backend.exception;

public class Unauthorized403 extends RuntimeException {
    public Unauthorized403(String message) {
        super(message);
    }
}
