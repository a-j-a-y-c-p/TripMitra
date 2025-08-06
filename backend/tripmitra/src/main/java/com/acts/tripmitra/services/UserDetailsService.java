package com.acts.tripmitra.services;

import com.acts.tripmitra.dto.UserDetailsDto;

public interface UserDetailsService {

	public UserDetailsDto getUserDetailsById(Integer id);
	public UserDetailsDto create(UserDetailsDto dto);
	public UserDetailsDto update(Integer id, UserDetailsDto dto);
	public void delete(Integer id);
	public UserDetailsDto getDetailsByUserId(String authHeader);
	
}
