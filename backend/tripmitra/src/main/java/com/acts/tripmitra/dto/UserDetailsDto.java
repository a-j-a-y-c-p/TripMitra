package com.acts.tripmitra.dto;
import java.sql.Date;

import com.acts.tripmitra.entity.Address;
import com.acts.tripmitra.entity.User;

import lombok.Data;

@Data
public class UserDetailsDto {
    
    private User user;
    private String phoneNumber;
    private String alterPhone;
    private String gender;
    private Date dateOfBirth;
    private String imageUrl;
    private Address address;
    
}
