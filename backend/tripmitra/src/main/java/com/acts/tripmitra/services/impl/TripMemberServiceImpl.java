package com.acts.tripmitra.services.impl;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.dto.AddressDto;
import com.acts.tripmitra.dto.UserDetailsDto;
import com.acts.tripmitra.dto.UserDto;
import com.acts.tripmitra.dto.UserResponseDto;
import com.acts.tripmitra.entity.Trip;
import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.entity.User;
import com.acts.tripmitra.entity.UserDetails;
import com.acts.tripmitra.repository.TripMemberRepository;
import com.acts.tripmitra.repository.TripRepository;
import com.acts.tripmitra.services.TripMemberService;
import com.acts.tripmitra.services.exceptions.TripUpdationException;
import com.acts.tripmitra.services.exceptions.UserAlreadyExistsException;
import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.TripMemberStatusEnum;

@Service
public class TripMemberServiceImpl implements TripMemberService {
	@Autowired
	TripMemberRepository repository;
	
	@Autowired
	TripRepository tripRepository;
	
	@Override
	public void addMember(MemberId memberId) throws UserAlreadyExistsException {
		 if (repository.existsById(memberId) ) {
	            throw new UserAlreadyExistsException("User already in the trip");
	        }
		
		TripMember tripMember = new TripMember();
		tripMember.setMemberId(memberId);
		tripMember.setStatus(TripMemberStatusEnum.WAITING);
		tripMember.setTripHost(false);
		repository.save(tripMember);
	}

	@Override
	public void removeMember(MemberId memberId) {
		repository.deleteById(memberId);
	}
	
	@Override
	public boolean memberExist(MemberId memberId) {
		return repository.existsByMemberId(memberId);
	}

	@Override
	public void updateStatus(TripMember tripMember) {
		try {
			repository.updateStatus(tripMember.getMemberId().getTripId(),
					tripMember.getMemberId().getUserId(),
					tripMember.getStatus().toString());
		}catch(Exception e) {
			System.out.println(e.getMessage());
			throw new TripUpdationException("Updation failed");
		}
		
	}
	
	@Override
	public void leave(MemberId memberId) {
		try {
			repository.updateStatus(memberId.getTripId(),
					memberId.getUserId(),
					TripMemberStatusEnum.LEAVING.toString());
		}catch(Exception e) {
			System.out.println(e.getMessage());
			throw new TripUpdationException("Updation failed");
		}
		
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

	@Override
	public List<UserDetailsDto> findAcceptedUsersByTripId(Integer tripId) {
		List<UserDetailsDto> usersDetailsDtoList = new ArrayList<>();
		List<UserDetails> usersList = repository.findAcceptedUsersByTripId(tripId);
		for(UserDetails userDetails : usersList) {
			UserDetailsDto userDetailsDto = new UserDetailsDto();
			BeanUtils.copyProperties(userDetails, userDetailsDto);
			userDetailsDto.setUser(new UserResponseDto());
    		BeanUtils.copyProperties(userDetails.getUser(), userDetailsDto.getUser());
    		userDetailsDto.setAddress(new AddressDto());
    		BeanUtils.copyProperties(userDetails.getAddress(), userDetailsDto.getAddress());
    		if (userDetails.getImageUrl() != null) {
    			userDetailsDto.setProfileImageBase64(Base64.getEncoder().encodeToString(userDetails.getImageUrl()));
    	    }
			usersDetailsDtoList.add(userDetailsDto);
		}
		return usersDetailsDtoList;
	}

	@Override

	public List<UserDetails> findWaitingUsersByTripId(Integer tripId) {
		
		return repository.findWaitingUsersByTripId(tripId);
	}

}
