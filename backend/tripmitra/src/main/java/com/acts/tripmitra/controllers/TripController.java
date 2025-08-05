package com.acts.tripmitra.controllers;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acts.tripmitra.dto.TripDto;
import com.acts.tripmitra.entity.Trip;
import com.acts.tripmitra.services.TripService;

@RestController
@RequestMapping("/trips")
public class TripController {
	
	@Autowired
	TripService tripService;
	
	@PostMapping("/new")
	public String createTrip(@RequestBody TripDto trip, @RequestHeader("Authorization") String authHeader) {
		return tripService.createTrip(trip, authHeader);
	}
	
	@GetMapping("/")
	public List<TripDto> getAllTrips(){
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
	
	@PutMapping("/update/{id}")
	public String updateTripById(@PathVariable("id") Integer id , @RequestBody TripDto trip) {
		return tripService.updateTripById(id,trip);
	}
	
	@PostMapping("/cancel/{id}")
	public String cancelTripById(@PathVariable("id") Integer id) {
		return tripService.cancelTrip(id);
	}

	@GetMapping("/filter")
	public List<Trip> getFilteredTrips(
	        @RequestParam(required = false) String source,
	        @RequestParam(required = false) String destination,
	        @RequestParam(required = false, defaultValue = "0") float minPrice,
	        @RequestParam(required = false, defaultValue = "10000") float maxPrice,
	        @RequestParam(required = false, defaultValue = "1") int minSeats,
	        @RequestParam(required = false, defaultValue = "100") int maxSeats
	) {
	    return tripService.getFilteredTrips(source, destination, minPrice, maxPrice, minSeats, maxSeats);
	}

	
}
