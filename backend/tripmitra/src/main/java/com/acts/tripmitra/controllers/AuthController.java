package com.acts.tripmitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acts.tripmitra.dto.LoginRequestDto;
import com.acts.tripmitra.services.UserAuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserAuthService userAuthService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequest) {
        String result = userAuthService.login(loginRequest.getUserEmail(), loginRequest.getUserPassword());
        return ResponseEntity.ok(result);
    }
}
