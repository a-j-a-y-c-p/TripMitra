package com.acts.tripmitra.services;


import java.util.List;


import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.services.exceptions.UserAlreadyExistsException;
import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.Status;


public interface TripMemberService {
	
	void addMember(MemberId memberId) throws UserAlreadyExistsException;
    void removeMember(MemberId memberId);
    void updateStatus(TripMember tripMember);
    List<TripMember> findById(int tripId);
	List<TripMember> findByStatus(String status);
}
