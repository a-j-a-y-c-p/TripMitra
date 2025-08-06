package com.acts.tripmitra.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
	
	@Query(value="select a.* from address a, userdetails ud where a.addressid = ud.addressid and ud.userid = :id",nativeQuery=true)
	Optional<Address> findByUserId(@Param("id")Integer userId);
}
