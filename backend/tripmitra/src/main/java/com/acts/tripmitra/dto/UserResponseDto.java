package com.acts.tripmitra.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserResponseDto {
	
	private String userEmail;

    private String userName;

    private String userRole;

}
