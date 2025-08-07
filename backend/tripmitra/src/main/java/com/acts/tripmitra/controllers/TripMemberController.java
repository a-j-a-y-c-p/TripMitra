package com.acts.tripmitra.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acts.tripmitra.dto.UserDetailsDto;
import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.entity.UserDetails;
import com.acts.tripmitra.services.TripMemberService;
import com.acts.tripmitra.services.TripService;
import com.acts.tripmitra.services.exceptions.UserAlreadyExistsException;
import com.acts.tripmitra.utilities.MemberId;

@RestController
@RequestMapping("/members")
public class TripMemberController {

	@Autowired
	TripMemberService service;
	@Autowired
	TripService tripService;

	@PostMapping("/add")
	public String addTripMember(@RequestBody MemberId memberId) {
		service.addMember(memberId);
		return "Member Added! ";
	}

	@DeleteMapping("/remove")
	public String removeTripMember(@RequestBody MemberId memberId) {
		service.removeMember(memberId);
		return "Member Removed!";
	}
	
	@PostMapping("/exists")
	public boolean exists(@RequestBody MemberId memberId) {
		return service.memberExist(memberId);
		
	}

	@PutMapping("/update")
	public String updateTripMember(@RequestBody TripMember tripMember) {
		service.updateStatus(tripMember);
		if(tripMember.getStatus().toString() == "ACCEPTED") {
			tripService.updateCurrMembers(tripMember.getMemberId().getTripId());
		}
		
		return "Member Updated!";
	}

	@PutMapping("/leave")
	public String leave(@RequestBody MemberId memberId) {
		service.leave(memberId);
		return "Leave Request Sent!";
	}
	
	@GetMapping("/")
	List<TripMember> getTripMembers(@RequestParam(name = "tripId") Integer tripId,
			@RequestParam(name = "status", required = false) String status) {

		if (null != status) {
			return service.findByStatus(status);
		} else {
			return service.findById(tripId);
		}
	}
	
	@GetMapping("/users/{tripId}")
	List<UserDetailsDto> getAcceptedUsersByTripId(@PathVariable("tripId") Integer tripId){
		return service.findAcceptedUsersByTripId(tripId);
		
	}

	@GetMapping("/requests/{tripId}")
	List<UserDetails> getWaitingUsersByTripId(@PathVariable("tripId") Integer tripId){
		return service.findWaitingUsersByTripId(tripId);

	}
	
	@GetMapping("/{id}")
	List<Integer> getHostedTripIdByUserId(@PathVariable("id") int id){
		
		return service.findHostedTripsByUserId(id);
		
	}
	
	@GetMapping("/trips/all/{id}")
	List<Integer> getAllTripIdByUserId(@PathVariable int id){

		return service.findAllTripsByUserId(id);
		
	}
	
	
	
}
