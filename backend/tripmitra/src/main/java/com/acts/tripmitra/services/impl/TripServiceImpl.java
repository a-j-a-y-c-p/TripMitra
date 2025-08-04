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
import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.repository.TripDetailsRepository;
import com.acts.tripmitra.repository.TripMemberRepository;
import com.acts.tripmitra.repository.TripRepository;
import com.acts.tripmitra.repository.UserRepository;
import com.acts.tripmitra.services.TripService;
import com.acts.tripmitra.services.exceptions.TripAlreadyExistsException;
import com.acts.tripmitra.services.exceptions.TripDeletionException;
import com.acts.tripmitra.services.exceptions.TripNotFoundException;
import com.acts.tripmitra.utilities.JwtUtil;
import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.Status;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class TripServiceImpl implements TripService {
	
	@Autowired
	TripRepository tripRepository;
	
	@Autowired
	TripDetailsRepository tripDetailsRepository;
	
	@Autowired
	TripMemberRepository tripMemberRepository;
	
	@Autowired
	JwtUtil jwtUtil;

	@Override
	public String createTrip(TripDto tripdto , String authHeader) {
		
		Trip trip = new Trip();
		
		BeanUtils.copyProperties(tripdto, trip);

		try {
			tripRepository.save(trip);
			
			TripMember tripMember = new TripMember();
			String token = authHeader.substring(7);
			Integer userId = jwtUtil.extractUserId(token);
			tripMember.setMemberId(new MemberId(trip.getTripId(),userId));
			tripMember.setStatus(Status.ACCEPTED);
			tripMember.setTripHost(true);
			System.out.println(tripMember);
			tripMemberRepository.save(tripMember);
		}
		catch(Exception e) {
			throw new TripAlreadyExistsException("Trip creation failed - duplicate or invalid data");
		}
		
		return "trip created successfully";
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
	
	public List<Trip> filterTrips(
		    String source,
		    String destination,
		    Double minPrice,
		    Double maxPrice,
		    Integer minSeats,
		    Integer maxSeats
		) {
		    return tripRepository.findByDynamicFilters(source, destination, minPrice, maxPrice, minSeats, maxSeats);
		}



}
