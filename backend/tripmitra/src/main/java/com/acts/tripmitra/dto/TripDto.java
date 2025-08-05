package com.acts.tripmitra.dto;


import com.acts.tripmitra.entity.TripDetails;

import lombok.Data;

@Data
public class TripDto {
	
	Integer tripId;
		
	String mode;
	
	Integer currMembers;
	
	Integer maxMembers;
	
	Float estimateCost;
	
	String description;
	
	TripDetails tripDetails;

}
