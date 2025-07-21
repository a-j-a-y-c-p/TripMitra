package com.acts.tripmitra.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.services.TripMemberService;
import com.acts.tripmitra.services.exceptions.UserAlreadyExistsException;
import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.Status;

@RestController
@RequestMapping("/members")
public class TripMemberController {

	@Autowired
	TripMemberService service;

	@PostMapping("/add")
	public String add(@RequestBody MemberId memberId) throws UserAlreadyExistsException {
		service.addMember(memberId);
		return "Member Added! ";
	}

	@PostMapping("/remove")
	public String remove(@RequestBody MemberId memberId) {
		service.removeMember(memberId);
		return "Member Removed!";
	}

	@PostMapping("/update")
	public String update(@RequestBody TripMember tripMember) {
		service.updateStatus(tripMember);
		return "Member Updated!";
	}

	@GetMapping("/")
	List<TripMember> getTripMembers(@RequestParam(name = "tripId") int tripId,
			@RequestParam(name = "status", required = false) String status) {

		if (null != status) {
			return service.findByStatus(status);
		} else {
			return service.findById(tripId);
		}
	}

}
