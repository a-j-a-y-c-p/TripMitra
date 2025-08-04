package com.acts.tripmitra.repository;

import java.util.List;

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
    	    """, nativeQuery = true)
    	List<Trip> filterTrips(String source, String destination,float minPrice, float maxPrice,
    	                       int minSeats, int maxSeats);


	    
}
