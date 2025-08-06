package com.acts.tripmitra.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.acts.tripmitra.dto.UserDto;
import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.entity.User;
import com.acts.tripmitra.entity.UserDetails;
import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.TripMemberStatusEnum;

import jakarta.transaction.Transactional;

public interface TripMemberRepository extends JpaRepository<TripMember, MemberId>{
	
	@Modifying
    @Transactional
    @Query(value = "UPDATE tripmembers tm SET tm.status = :status WHERE tm.tripid = :tripId and tm.userid = :userId", nativeQuery = true)
    void updateStatus(@Param("tripId") Integer tripId,
    				@Param("userId") Integer userId,
                      @Param("status") String status);
	
	@Query(value = "select * from tripmembers where tripid = :tripId", nativeQuery = true)
	List<TripMember> findByTripId(@Param("tripId") int tId);
	
	List<TripMember> findByStatus(TripMemberStatusEnum status);
	
	@Query(value = "select tripid from tripmembers where userid = :userId and isTripHost = 1", nativeQuery = true)
	List<Integer> findHostedTripsByUserId(@Param("userId")int id);
	
	@Query(value = "select tripid from tripmembers where userid = :userId", nativeQuery = true)
	List<Integer> findAllTripsByUserId(@Param("userId")int id);
	
	@Query(value = """ 
			select * from userdetails where userid in 
			(select userid from tripmembers
			where tripid = :tripId and status = 'ACCEPTED' )
			""",
			nativeQuery = true)
	List<UserDetails> findAcceptedUsersByTripId(@Param ("tripId") Integer tripId);

	@Query(value = """ 
			select * from userdetails where userid in 
			(select userid from tripmembers
			where tripid = :tripId and status = 'WAITING' )
			""",
			nativeQuery = true)
	List<UserDetails> findWaitingUsersByTripId(@Param ("tripId") Integer tripId);
	
	
}
