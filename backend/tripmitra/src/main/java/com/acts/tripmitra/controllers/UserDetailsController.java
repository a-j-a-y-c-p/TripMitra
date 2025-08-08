package com.acts.tripmitra.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acts.tripmitra.dto.UserDetailsDto;
import com.acts.tripmitra.entity.UserDetails;
import com.acts.tripmitra.services.UserDetailsService;

@RestController
@RequestMapping("/userdetails")
public class UserDetailsController {

    @Autowired
    private UserDetailsService userDetailsService;


    @GetMapping("/{id}")
    public UserDetails getUserDetailsById(@PathVariable Integer id) {
        return userDetailsService.getUserDetailsById(id);
    }
    
    @GetMapping("/byUser/{id}")
    public UserDetailsDto getUserDetailsByUserId(@PathVariable Integer id) {
        return userDetailsService.getUserDetailsByUserId(id);
    }
    

    @GetMapping("/getAllUser")
    public List<UserDetails> getAllUserDetails(){
    	return userDetailsService.getAllUserDetails();
    }

    @GetMapping("/userdetailsGet")
    public UserDetailsDto getUserDetailsByToken(@RequestHeader("Authorization") String authHeader) {
        return userDetailsService.getDetailsByUserId(authHeader);
    }

    @PutMapping("/userdetailsPut")
    public UserDetailsDto updateUserDetailsByToken(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody UserDetailsDto dto) {
        return userDetailsService.updateByToken(authHeader, dto);
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
    

    @GetMapping("/getAllUser/filter")
    public ResponseEntity<Page<UserDetails>> filterUsers(
            @RequestParam(required = false) String gender,
            @RequestParam(required = false) Boolean isBlocked,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<UserDetails> result = userDetailsService.getFilteredUsers(gender, isBlocked, keyword, pageable);
        return ResponseEntity.ok(result);
    }
    
//    @PatchMapping("/blockUser/{id}")
//    public String blockUser(@PathVariable Integer id ){
//    	return userDetailsService.blockUserById(id);
//    }
    
    @PatchMapping("/blockUser/{id}")
    public String toggleUserBlockStatus(@PathVariable Integer id) {
        return userDetailsService.toggleBlockStatus(id);
    }
    
    @PatchMapping("/unBlockUser/{id}")
    public String unBlockUser(@PathVariable Integer id ){
    	return userDetailsService.unBlockUserById(id);
    }

}

