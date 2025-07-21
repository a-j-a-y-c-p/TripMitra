package com.acts.tripmitra.services.impl;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.dto.TripDto;
import com.acts.tripmitra.entity.Trip;
import com.acts.tripmitra.repository.TripRepository;
import com.acts.tripmitra.services.TripService;

@Service
public class TripServiceImpl implements TripService {
	
	@Autowired
	TripRepository tripRepository;

	@Override
	public String createTrip(TripDto tripdto) {
		
		Trip trip = new Trip();
		
		BeanUtils.copyProperties(tripdto, trip);
		try {
			tripRepository.save(trip);
		}
		catch(Exception e) {
			return "error";
		}
		
		return "created";
	}

	@Override
	public Iterator<TripDto> getAllTrips() {
		List<Trip> tripList = tripRepository.findAll();
		List<TripDto> tripDtoList = new ArrayList<>();
		for(Trip trip: tripList) {
			TripDto tripDto = new TripDto();
			BeanUtils.copyProperties(trip, tripDto);
			tripDtoList.add(tripDto);
		}
		return tripDtoList.iterator();
	}

	@Override
	public TripDto getTripById(Integer id) {
		Optional<Trip> trip = tripRepository.findById(id);
		if(trip.isEmpty()) {
//			throw new TripNotFoundException("Trip with id:" + id + " does not exist.");
		}
		TripDto tripDto = new TripDto();
		BeanUtils.copyProperties(trip.get(), tripDto);
		return tripDto;
	}

	@Override
	public String deleteTrip(Integer tripId) {
		try {
			tripRepository.deleteById(tripId);
		}
		catch(Exception e) {
			return "Delete failed";
		}
		return "Deleted successfully";
	}
	

}
