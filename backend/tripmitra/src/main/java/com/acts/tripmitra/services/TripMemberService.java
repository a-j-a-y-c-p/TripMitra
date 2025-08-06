package com.acts.tripmitra.services;


import java.util.List;

import com.acts.tripmitra.dto.UserDetailsDto;
import com.acts.tripmitra.dto.UserDto;
import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.services.exceptions.UserAlreadyExistsException;
import com.acts.tripmitra.utilities.MemberId;

public interface TripMemberService {
	
	void addMember(MemberId memberId) throws UserAlreadyExistsException;
    void removeMember(MemberId memberId);
    void updateStatus(TripMember tripMember);
    List<TripMember> findById(int tripId);
	List<TripMember> findByStatus(String status);
	List<Integer> findHostedTripsByUserId(int id);
	List<Integer> findAllTripsByUserId(int id);
	List<UserDetailsDto> findAcceptedUsersByTripId(Integer tripId);
	List<UserDetailsDto> findAcceptedandWaitingUsersByTripId(Integer tripId);
	
}
