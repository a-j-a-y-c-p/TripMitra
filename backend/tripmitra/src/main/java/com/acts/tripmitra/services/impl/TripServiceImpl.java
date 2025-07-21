package com.acts.tripmitra.services.impl;

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

			System.out.println(trip.getMode());
			System.out.println(trip.getCurMembers());
			System.out.println(trip.getEstimateCost());
			System.out.println(trip.getMaxMembers());
			tripRepository.save(trip);
		}
		catch(Exception e) {
			return "error";
		}
		
		return "created";
	}

}
