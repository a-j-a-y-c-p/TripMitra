package com.acts.tripmitra.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	public String createTrip(@RequestBody TripDto trip) {
		return tripService.createTrip(trip);
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

	@GetMapping("/filter")
	public Page<Trip> getFilteredTrips(
	    @RequestParam(required = false) String source,
	    @RequestParam(required = false) String destination,
	    @RequestParam(required = false, defaultValue = "0") float minPrice,
	    @RequestParam(required = false, defaultValue = "10000") float maxPrice,
	    @RequestParam(required = false, defaultValue = "0") int minSeats,
	    @RequestParam(required = false, defaultValue = "100") int maxSeats,
	    @RequestParam(defaultValue = "0") int page,
	    @RequestParam(defaultValue = "6") int size
	) {
	    Pageable pageable = PageRequest.of(page, size);
	    return tripService.getFilteredTrips(source, destination, minPrice, maxPrice, minSeats, maxSeats,pageable);
	}
	
}
