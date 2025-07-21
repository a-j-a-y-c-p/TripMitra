package com.acts.tripmitra.services;

import java.util.Iterator;

import com.acts.tripmitra.dto.TripDto;

public interface TripService {
	public String createTrip(TripDto trip);
	public Iterator<TripDto> getAllTrips();
	public TripDto getTripById(Integer id);
	public String deleteTrip(Integer tripId);
}
