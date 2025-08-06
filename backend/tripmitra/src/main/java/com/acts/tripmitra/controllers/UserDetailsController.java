package com.acts.tripmitra.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acts.tripmitra.dto.UserDetailsDto;
import com.acts.tripmitra.services.UserDetailsService;

@RestController
@RequestMapping("/userdetails")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;


    @GetMapping("/{id}")
    public UserDetailsDto getUserDetailsById(@PathVariable Integer id) {
        return userDetailsService.getUserDetailsById(id);
    }
    
    @GetMapping("/b")
    public UserDetailsDto getUserDetailsByToken(@RequestHeader("Authorization") String authHeader) {
        return userDetailsService.getDetailsByUserId(authHeader);
    }

    
    @PostMapping
    public UserDetailsDto create(@RequestBody UserDetailsDto dto) {
        return userDetailsService.create(dto);
    }

    @PutMapping("/{id}")
    public UserDetailsDto update(@PathVariable Integer id, @RequestBody UserDetailsDto dto) {
        return userDetailsService.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        userDetailsService.delete(id);
    }
    
    
}

