package com.acts.tripmitra.services;

import java.util.Iterator;
import java.util.List;

import com.acts.tripmitra.dto.TripDto;
import com.acts.tripmitra.entity.Trip;

public interface TripService {
	public String createTrip(TripDto trip, String authHeader);
	public Iterator<TripDto> getAllTrips();
	public TripDto getTripById(Integer id);
	public String deleteTrip(Integer tripId);
	public List<Trip> filterTrips(String source, String destination, Double minPrice, Double maxPrice,Integer minSeats, Integer maxSeats);
}
