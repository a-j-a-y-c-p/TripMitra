package com.acts.tripmitra.services;

import java.util.List;
import com.acts.tripmitra.dto.TripDto;
import com.acts.tripmitra.entity.Trip;

public interface TripService {
	public String createTrip(TripDto trip, String authHeader);
	public List<TripDto> getAllTrips();
	public TripDto getTripById(Integer id);
	public String deleteTrip(Integer tripId);
	public List<Trip> getFilteredTrips(String source, String destination, float minPrice, float maxPrice,int minSeats, int maxSeats);
	public String cancelTrip(Integer id);
	public String updateTripById(Integer id, TripDto trip);
}
