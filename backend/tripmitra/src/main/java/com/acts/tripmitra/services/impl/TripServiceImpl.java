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
import com.acts.tripmitra.entity.TripDetails;
import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.repository.TripDetailsRepository;
import com.acts.tripmitra.repository.TripMemberRepository;
import com.acts.tripmitra.repository.TripRepository;
import com.acts.tripmitra.services.TripService;
import com.acts.tripmitra.services.exceptions.TripAlreadyExistsException;
import com.acts.tripmitra.services.exceptions.TripDeletionException;
import com.acts.tripmitra.services.exceptions.TripNotFoundException;
import com.acts.tripmitra.services.exceptions.TripUpdationException;
import com.acts.tripmitra.utilities.JwtUtil;
import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.TripMemberStatusEnum;
import com.acts.tripmitra.utilities.TripStatusEnum;

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
		trip.setStatus(TripStatusEnum.ACTIVE);
		try {
			tripRepository.save(trip);
			
			TripMember tripMember = new TripMember();
			String token = authHeader.substring(7);
			Integer userId = jwtUtil.extractUserId(token);
			tripMember.setMemberId(new MemberId(trip.getTripId(),userId));
			tripMember.setStatus(TripMemberStatusEnum.ACCEPTED);
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
	public TripDto getActiveTripById(Integer id) {
		Optional<Trip> trip = tripRepository.findActiveTripById(id);
		if(trip.isEmpty()) {
			throw new TripNotFoundException("Trip with ID " + id + " not found.");
		}
		TripDto tripDto = new TripDto();
		BeanUtils.copyProperties(trip.get(), tripDto);
		return tripDto;
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

	
	@Override
	public String updateTripById(Integer tripId, TripDto tripDto) {
		try {
			Optional<Trip> Otrip = tripRepository.findById(tripId);
			if(Otrip.isEmpty()) {
				throw new TripNotFoundException("Trip with ID " + tripId + " not found.");
			}
			Trip trip = Otrip.get();
			if(null != tripDto.getCurrMembers()) {
				trip.setCurrMembers(tripDto.getCurrMembers());
			}
			if(null != tripDto.getEstimateCost()) {
				trip.setEstimateCost(tripDto.getEstimateCost());
			}
			if(null != tripDto.getMaxMembers()) {
				trip.setMaxMembers(tripDto.getMaxMembers());
			}
			if(null != tripDto.getMode()) {
				trip.setMode(tripDto.getMode());
			}
			if(null != tripDto.getDescription()) {
				trip.setDescription(tripDto.getDescription());
			}
			if(null != tripDto.getStatus()) {
				trip.setStatus(tripDto.getStatus());
			}
			if(null != tripDto.getTripDetails()) {
				TripDetails details = trip.getTripDetails();
				if(null != tripDto.getTripDetails().getDestination()) {
					details.setDestination(tripDto.getTripDetails().getDestination());
				}
				if(null != tripDto.getTripDetails().getEndDate()) {
					details.setEndDate(tripDto.getTripDetails().getEndDate());
				}
				if(null != tripDto.getTripDetails().getSource()) {
					details.setSource(tripDto.getTripDetails().getSource());
				}
				if(null != tripDto.getTripDetails().getStartDate()) {
					details.setStartDate(tripDto.getTripDetails().getStartDate());
				}
				trip.setTripDetails(details);
			}
			tripRepository.save(trip);
		} catch(Exception e) {
			throw new TripUpdationException("Failed to update trip with ID " + tripId);
		}
		return "Trip Updated successfully";
	}

//	@Override
//	public List<Trip> getFilteredTrips(String source, String destination, float minPrice, float maxPrice,
//	                                   int minSeats, int maxSeats) {
//	    return tripRepository.filterTrips(source, destination, minPrice, maxPrice, minSeats, maxSeats);
//	}

	
	@Override
	public Page<Trip> getFilteredActiveTrips(String source, String destination,float minPrice, float maxPrice,int minSeats, 
										int maxSeats,Pageable pageable) {
				return tripRepository.findFilteredTrips(source, destination,minPrice, maxPrice, minSeats, maxSeats,TripStatusEnum.ACTIVE.toString(), pageable);
	}

	@Override
	public String cancelTrip(Integer tripId) {
		if (!tripRepository.existsById(tripId)) {
			throw new TripNotFoundException("Cannot cancel Trip with ID " + tripId + " not found.");
		}
		try {
			tripRepository.updateStatus(tripId, TripStatusEnum.CANCELLED.toString());
		} catch (Exception e) {
			System.out.println(e.getMessage());
			throw new TripDeletionException("Failed to cancel trip with ID " + tripId);
		}
		return "Trip cancelled successfully";
	}

	@Override
	public List<TripDto> getAllCancelledTrips() {
		List<Trip> tripList = tripRepository.findAllByStatus(TripStatusEnum.CANCELLED);
		List<TripDto> tripDtoList = new ArrayList<>();
		for(Trip trip: tripList) {
			TripDto tripDto = new TripDto();
			BeanUtils.copyProperties(trip, tripDto);
			tripDtoList.add(tripDto);
		}
		return tripDtoList;
	}

	@Override
	public List<TripDto> getAllCompletedTrips() {
		List<Trip> tripList = tripRepository.findAllByStatus(TripStatusEnum.COMPLETED);
		List<TripDto> tripDtoList = new ArrayList<>();
		for(Trip trip: tripList) {
			TripDto tripDto = new TripDto();
			BeanUtils.copyProperties(trip, tripDto);
			tripDtoList.add(tripDto);
		}
		return tripDtoList;
	}

	
	


}
