package com.acts.tripmitra.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name="trip")
@Data
public class Trip {
	
	@Id
	@Column(name="tripid")
	@GeneratedValue(generator="increment")
	Integer tripId;
	
	@Column(name="mode")
	String mode;
	
	@Column(name="currmembers")
	Integer curMembers;
	
	@Column(name="maxmembers")
	Integer maxMembers;
	
	@Column(name="estimatecost")
	Float estimateCost;

}
