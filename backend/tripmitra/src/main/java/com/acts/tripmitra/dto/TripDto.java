package com.acts.tripmitra.dto;


import lombok.Data;

@Data
public class TripDto {
	
	Integer tripId;
		
	String mode;
	
	Integer curMembers;
	
	Integer maxMembers;
	
	Float estimateCost;

}
