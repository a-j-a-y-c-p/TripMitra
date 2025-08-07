package com.acts.tripmitra.services;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.acts.tripmitra.dto.UserDetailsDto;
import com.acts.tripmitra.entity.UserDetails;

public interface UserDetailsService {

	public UserDetailsDto getUserDetailsById(Integer id);
	public UserDetailsDto create(UserDetailsDto dto);
	public UserDetailsDto update(Integer id, UserDetailsDto dto);
	public void delete(Integer id);
	public List<UserDetails> getAllUserDetails();
	public Page<UserDetails> getFilteredUsers(String gender, Boolean isBlocked, String keyword, Pageable pageable);
	public UserDetailsDto getDetailsByUserId(String authHeader);
	public UserDetailsDto updateByToken(String authHeader, UserDetailsDto dto);
	public String blockUserById(Integer id);
	public String unBlockUserById(Integer id);
	
}
