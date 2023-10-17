package com.moodle.backend.controller;

import com.moodle.backend.entity.RegistrationSource;
import com.moodle.backend.entity.UserEntity;
import com.moodle.backend.entity.UserRole;
import com.moodle.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {

    @Autowired
    private final UserService userService;
    @PostMapping("/user/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void changeToAdmin(@PathVariable String email) {
        userService.findByEmail(email).ifPresent(userEntity -> {
            userEntity.setRole(UserRole.ROLE_ADMIN);
            userService.save(userEntity);
        });
    }
    @PostMapping("/admin/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void saveAdmin(@PathVariable String email) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName("Eshan");
        userEntity.setEmail(email);
        userEntity.setSource(RegistrationSource.Google);
        userEntity.setRole(UserRole.ROLE_ADMIN);
        userService.save(userEntity);
    }

    @PostMapping("/mod/{email}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public void saveMod(@PathVariable String email) {
        UserEntity userEntity = new UserEntity();
        userEntity.setName("Gayanga");
        userEntity.setEmail(email);
        userEntity.setSource(RegistrationSource.Google);
        userEntity.setRole(UserRole.ROLE_USER);
        userService.save(userEntity);
    }
}
