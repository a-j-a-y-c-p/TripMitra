package com.acts.tripmitra.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.acts.tripmitra.entity.Trip;
import com.acts.tripmitra.utilities.TripStatusEnum;

import jakarta.transaction.Transactional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {
	   
	
	@Query(value = """
		    SELECT t.* FROM trip t
		    JOIN tripdetails td ON t.tripdetailsid = td.tripdetailsid
		    WHERE (:source IS NULL OR td.source = :source)
		      AND (:destination IS NULL OR td.destination = :destination)
		      AND (t.estimatecost BETWEEN :minPrice AND :maxPrice)
		      AND ((t.maxmembers - t.currmembers) BETWEEN :minSeats AND :maxSeats)
		    """,
		    countQuery = """
		    SELECT COUNT(*) FROM trip t
		    JOIN tripdetails td ON t.tripdetailsid = td.tripdetailsid
		    WHERE t.status = :status
		      AND (:source IS NULL OR td.source = :source)
		      AND (:destination IS NULL OR td.destination = :destination)
		      AND (t.estimatecost BETWEEN :minPrice AND :maxPrice)
		      AND ((t.maxmembers - t.currmembers) BETWEEN :minSeats AND :maxSeats)
		    """,
		    nativeQuery = true)
		Page<Trip> findFilteredTrips(
		        @Param("source") String source,
		        @Param("destination") String destination,
		        @Param("minPrice") float minPrice,
		        @Param("maxPrice") float maxPrice,
		        @Param("minSeats") int minSeats,
		        @Param("maxSeats") int maxSeats,
		        @Param("status") String status,
		        Pageable pageable);
	
	@Modifying
	@Transactional
    @Query(value="UPDATE trip t SET t.status = :status WHERE t.tripId = :tripId", nativeQuery=true)
    int updateStatus(@Param("tripId") Integer tripId,
                      @Param("status") String status);

	List<Trip> findAllByStatus(TripStatusEnum status);

	@Query(value="select * from trip where tripid = :id and status='ACTIVE'", nativeQuery = true)
	Optional<Trip> findActiveTripById(Integer id);
	
	

}
