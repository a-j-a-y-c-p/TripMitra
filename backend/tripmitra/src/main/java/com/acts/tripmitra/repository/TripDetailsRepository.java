package com.acts.tripmitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.TripDetails;

@Repository
public interface TripDetailsRepository extends JpaRepository<TripDetails, Integer> {

}
