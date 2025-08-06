package com.acts.tripmitra.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.Trip;
import com.acts.tripmitra.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserEmail(String email);
    boolean existsByUserEmail(String email);
    
    @Query(value = """
    		select * 
    		from trip 
    		where tripid in (select t.tripid 
    					 from users u 
    					 join tripmembers t
    					 on u.userid=t.userid
    					 and t.userid=:id)
    		""" , 
    		nativeQuery = true)
    List<Trip> getAllTripByUserId(Integer id);
}
