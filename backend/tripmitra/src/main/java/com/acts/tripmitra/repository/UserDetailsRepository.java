package com.acts.tripmitra.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.UserDetails;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Integer> {

	@Query(value = """
	        SELECT ud FROM UserDetails ud
	        JOIN ud.user u
	        WHERE (:gender IS NULL OR ud.gender = :gender)
	        AND (:isBlocked IS NULL OR ud.isBlocked = :isBlocked)
	        AND (:keyword IS NULL OR u.userName LIKE %:keyword% OR u.userEmail LIKE %:keyword%)
	    """)
	    Page<UserDetails> findFilteredUsers(@Param("gender") String gender,
	                                        @Param("isBlocked") Boolean isBlocked,
	                                        @Param("keyword") String keyword,
	                                        Pageable pageable);
	
}
