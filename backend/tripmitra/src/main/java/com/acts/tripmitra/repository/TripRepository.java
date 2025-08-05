package com.acts.tripmitra.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.Trip;

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
		    WHERE (:source IS NULL OR td.source = :source)
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
		        Pageable pageable);

}
