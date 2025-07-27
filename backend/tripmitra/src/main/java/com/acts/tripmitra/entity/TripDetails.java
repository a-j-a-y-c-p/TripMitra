package com.acts.tripmitra.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "tripdetails")
@Data
public class TripDetails {
	@Id
	@Column(name="tripdetailsid")
	@GeneratedValue(generator="increment")
	Integer tripDetailsId;
	@Column(name="source")
	String source;
	@Column(name="destination")
	String destination;
	@Column(name="startdate")
	Date startDate;
	@Column(name="enddate")
	Date endDate;
	
	@OneToOne(mappedBy = "tripDetails")
	@JsonBackReference
	Trip trip;

}
