package com.acts.tripmitra.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.UserDetails;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer> {

    @Query(value = "SELECT * FROM userdetails WHERE userId = :id", nativeQuery = true)
    Optional<UserDetails> findByUserId(@Param("id") Integer userId);
}
