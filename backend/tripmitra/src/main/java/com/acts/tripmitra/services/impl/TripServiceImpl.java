package com.acts.tripmitra.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.dto.TripDto;
import com.acts.tripmitra.entity.Trip;
import com.acts.tripmitra.repository.TripDetailsRepository;
import com.acts.tripmitra.repository.TripRepository;
import com.acts.tripmitra.services.TripService;
import com.acts.tripmitra.services.exceptions.TripAlreadyExistsException;
import com.acts.tripmitra.services.exceptions.TripDeletionException;
import com.acts.tripmitra.services.exceptions.TripNotFoundException;

@Service
public class TripServiceImpl implements TripService {
	
	@Autowired
	TripRepository tripRepository;
	
	@Autowired
	TripDetailsRepository tripDetailsRepository;

	@Override
	public String createTrip(TripDto tripdto) {
		Trip trip = new Trip();
		BeanUtils.copyProperties(tripdto, trip);
		try {
			tripRepository.save(trip);
		}
		catch(Exception e) {
			throw new TripAlreadyExistsException("Trip creation failed - duplicate or invalid data");
		}
		return "trip created successfully";
	}

	@Override
	public List<TripDto> getAllTrips() {
		List<Trip> tripList = tripRepository.findAll();
		List<TripDto> tripDtoList = new ArrayList<>();
		for(Trip trip: tripList) {
			TripDto tripDto = new TripDto();
			BeanUtils.copyProperties(trip, tripDto);
			tripDtoList.add(tripDto);
		}
		return tripDtoList;
	}

	@Override
	public TripDto getTripById(Integer id) {
		Optional<Trip> trip = tripRepository.findById(id);
		if(trip.isEmpty()) {
			throw new TripNotFoundException("Trip with ID " + id + " not found.");
		}
		TripDto tripDto = new TripDto();
		BeanUtils.copyProperties(trip.get(), tripDto);
		return tripDto;
	}

	@Override
	public String deleteTrip(Integer tripId) {
		if (!tripRepository.existsById(tripId)) {
			throw new TripNotFoundException("Cannot delete. Trip with ID " + tripId + " not found.");
		}
		try {
			tripRepository.deleteById(tripId);
		} catch (Exception e) {
			throw new TripDeletionException("Failed to delete trip with ID " + tripId);
		}
		return "Trip deleted successfully";
	}

//	@Override
//	public List<Trip> getFilteredTrips(String source, String destination, float minPrice, float maxPrice,
//	                                   int minSeats, int maxSeats) {
//	    return tripRepository.filterTrips(source, destination, minPrice, maxPrice, minSeats, maxSeats);
//	}
	
	@Override
	public Page<Trip> getFilteredTrips(String source, String destination,float minPrice, float maxPrice,int minSeats, 
										int maxSeats,Pageable pageable) {
				return tripRepository.findFilteredTrips(source, destination,minPrice, maxPrice, minSeats, maxSeats, pageable);
	}


}
