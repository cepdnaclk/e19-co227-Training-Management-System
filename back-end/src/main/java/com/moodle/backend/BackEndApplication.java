package com.moodle.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:5173")
@SpringBootApplication
public class BackEndApplication {


	public static void main(String[] args) {
		SpringApplication.run(BackEndApplication.class, args);
	}

}