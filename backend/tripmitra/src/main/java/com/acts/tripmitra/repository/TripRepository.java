package com.acts.tripmitra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.Trip;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {
	
	 @Query(value = "SELECT t.source FROM trip t " +
             "JOIN tripdetails td ON t.tripdetailsid = td.tripdetailsid " +
             "WHERE (:source IS NULL OR td.source = :source) " +
             "AND (:destination IS NULL OR td.destination = :destination) " +
             "AND (:minPrice IS NULL OR t.estimatecost >= :minPrice) " +
             "AND (:maxPrice IS NULL OR t.estimatecost <= :maxPrice) " +
             "AND (:minSeats IS NULL OR (t.maxmembers - t.currmembers) >= :minSeats) " +
             "AND (:maxSeats IS NULL OR (t.maxmembers - t.currmembers) <= :maxSeats)", 
     nativeQuery = true)
		List<Trip> findByDynamicFilters(
		    @Param("source") String source,
		    @Param("destination") String destination,
		    @Param("minPrice") Double minPrice,
		    @Param("maxPrice") Double maxPrice,
		    @Param("minSeats") Integer minSeats,
		    @Param("maxSeats") Integer maxSeats
		);




}
