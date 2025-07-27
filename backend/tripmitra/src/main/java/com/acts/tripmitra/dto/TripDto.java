package com.acts.tripmitra.dto;


import com.acts.tripmitra.entity.TripDetails;

import lombok.Data;

@Data
public class TripDto {
	
	Integer tripId;
		
	String mode;
	
	Integer curMembers;
	
	Integer maxMembers;
	
	Float estimateCost;
	
	TripDetails tripDetails;

}
