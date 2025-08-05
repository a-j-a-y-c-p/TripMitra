package com.acts.tripmitra.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.acts.tripmitra.dto.TripDto;
import com.acts.tripmitra.entity.Trip;

public interface TripService {
	public String createTrip(TripDto trip, String authHeader);
	public List<TripDto> getAllTrips();
	public TripDto getTripById(Integer id);
	public String deleteTrip(Integer tripId);

	public Page<Trip> getFilteredTrips(String source, String destination,float minPrice, float maxPrice,int minSeats, 
			int maxSeats,Pageable pageable);
	public String cancelTrip(Integer id);
	public String updateTripById(Integer id, TripDto trip);
	
}
