package com.acts.tripmitra.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.acts.tripmitra.entity.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUserEmail(String email);
    boolean existsByUserEmail(String email);
}
