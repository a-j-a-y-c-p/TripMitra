package com.acts.tripmitra.entity;

import com.acts.tripmitra.utilities.TripStatusEnum;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
	Integer currMembers;
	
	@Column(name="maxmembers")
	Integer maxMembers;
	
	@Column(name="estimatecost")
	Float estimateCost;
	
	@Column(name="description")
	String description;
	
	@Column(name="status")
	@Enumerated(EnumType.STRING)
	TripStatusEnum status;
	
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "tripdetailsid", referencedColumnName = "tripdetailsid")
    @JsonManagedReference
	TripDetails tripDetails;

}
