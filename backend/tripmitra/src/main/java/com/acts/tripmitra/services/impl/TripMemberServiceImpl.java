package com.acts.tripmitra.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.entity.Trip;
import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.repository.TripMemberRepository;
import com.acts.tripmitra.services.TripMemberService;
import com.acts.tripmitra.services.exceptions.UserAlreadyExistsException;
import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.TripMemberStatusEnum;

@Service
public class TripMemberServiceImpl implements TripMemberService {
	@Autowired
	TripMemberRepository repository;

	@Override
	public void addMember(MemberId memberId) throws UserAlreadyExistsException {
		 if (repository.existsById(memberId) ) {
	            throw new UserAlreadyExistsException("User already in the trip");
	        }
		
		TripMember tripMember = new TripMember();
		tripMember.setMemberId(memberId);
		tripMember.setStatus(TripMemberStatusEnum.WAITING);
		repository.save(tripMember);
	}

	@Override
	public void removeMember(MemberId memberId) {
		repository.deleteById(memberId);
	}

	@Override
	public void updateStatus(TripMember tripMember) {
		repository.updateStatus(tripMember.getMemberId(),
								tripMember.getStatus());
	}

	@Override
	public List<TripMember> findById(int tripId) {
		
		return repository.findByTripId(tripId);
	}

	@Override
	public List<TripMember> findByStatus(String status) {
		return repository.findByStatus(TripMemberStatusEnum.valueOf(status));
	}

	@Override
	public List<Integer> findHostedTripsByUserId(int id) {
		
		 return repository.findHostedTripsByUserId(id); 
		 
	}

	@Override
	public List<Integer> findAllTripsByUserId(int id) {
		return repository.findAllTripsByUserId(id);
	}

	
	
	
}
