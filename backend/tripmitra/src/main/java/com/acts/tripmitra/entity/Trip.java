package com.acts.tripmitra.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
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
	
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tripdetailsid", referencedColumnName = "tripdetailsid")
    @JsonManagedReference
	TripDetails tripDetails;

}
