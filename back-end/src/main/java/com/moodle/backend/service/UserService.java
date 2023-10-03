package com.moodle.backend.service;

import com.moodle.backend.entity.UserEntity;

import java.util.Optional;

public interface UserService {

    Optional<UserEntity> findByEmail(String email);

    void save(UserEntity user);
}
