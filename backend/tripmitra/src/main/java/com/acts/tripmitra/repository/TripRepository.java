package com.acts.tripmitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.Trip;

@Repository
public interface TripRepository extends JpaRepository<Trip, Integer> {

}
