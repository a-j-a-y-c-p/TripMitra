package com.acts.tripmitra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import com.acts.tripmitra.entity.TripMember;
import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.Status;

import jakarta.transaction.Transactional;

public interface TripMemberRepository extends JpaRepository<TripMember, MemberId>{
	
	@Modifying
    @Transactional
    @Query("UPDATE TripMember tm SET tm.status = :status WHERE tm.memberId = :memberId")
    void updateStatus(@Param("memberId") MemberId memberId,
                      @Param("status") Status status);
	
	@Query(value = "select * from tripmembers where tripid = :tripId", nativeQuery = true)
	List<TripMember> findByTripId(@Param("tripId") int tId);
	
	List<TripMember> findByStatus(Status status);

	
}
