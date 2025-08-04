package com.acts.tripmitra.controllers;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	@GetMapping("/filter")
	public ResponseEntity<List<Trip>> filterTrips(
	    @RequestParam(required = false) String source,
	    @RequestParam(required = false) String destination,
	    @RequestParam(required = false) Double minPrice,
	    @RequestParam(required = false) Double maxPrice,
	    @RequestParam(required = false) Integer minSeats,
	    @RequestParam(required = false) Integer maxSeats
	) {
	    List<Trip> trips = tripService.filterTrips(source, destination, minPrice, maxPrice, minSeats, maxSeats);
	    return ResponseEntity.ok(trips);
	}

	

}
