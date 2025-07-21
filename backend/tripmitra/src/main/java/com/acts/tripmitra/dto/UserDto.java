package com.acts.tripmitra.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserDto {


    private String userEmail;

    private String userName;

    private String userPassword;

    private String userRole;
	
}
