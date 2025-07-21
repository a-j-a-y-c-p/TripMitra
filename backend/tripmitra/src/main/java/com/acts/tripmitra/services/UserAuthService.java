package com.acts.tripmitra.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.entity.User;
import com.acts.tripmitra.repository.UserRepository;

@Service
public class UserAuthService {

    @Autowired
    private UserRepository userRepository;

    public String login(String email, String password) {
        User user = userRepository.findByUserEmail(email);
        if (user != null && user.getUserPassword().equals(password)) {
            return "Login Successful for " + user.getUserName();
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }
}