package com.acts.tripmitra.dto;
import java.sql.Date;

import lombok.Data;

@Data
public class UserDetailsDto {
	
	private Integer userDetailsId;
    private UserResponseDto user;
    private String phoneNumber;
    private String alterPhone;
    private String gender;
    private Date dateOfBirth;
   // private String imageUrl;
    private String profileImageBase64;
    private boolean isBlocked;
    private AddressDto address;
    
}
