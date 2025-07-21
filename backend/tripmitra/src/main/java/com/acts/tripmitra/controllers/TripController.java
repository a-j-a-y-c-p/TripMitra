package com.acts.tripmitra.controllers;

import java.util.Iterator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.acts.tripmitra.dto.TripDto;
import com.acts.tripmitra.services.TripService;

@RestController
@RequestMapping("/trips")
public class TripController {
	
	@Autowired
	TripService tripService;
	
	@PostMapping("/new")
	public String createTrip(@RequestBody TripDto trip) {
		return tripService.createTrip(trip);
	}
	
	@GetMapping("/")
	public Iterator<TripDto> getAllTrips(){
		return tripService.getAllTrips();
	}
	
	@GetMapping("/{id}")
	public TripDto getTripById(@PathVariable("id") Integer id){
		return tripService.getTripById(id);
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteTripById(@PathVariable("id") Integer id) {
		return tripService.deleteTrip(id);
	}
	
	

}
