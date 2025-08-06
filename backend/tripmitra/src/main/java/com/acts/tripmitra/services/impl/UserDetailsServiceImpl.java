package com.acts.tripmitra.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.dto.AddressDto;
import com.acts.tripmitra.dto.UserDetailsDto;
import com.acts.tripmitra.dto.UserResponseDto;
import com.acts.tripmitra.entity.Address;
import com.acts.tripmitra.entity.UserDetails;
import com.acts.tripmitra.repository.UserDetailsRepository;
import com.acts.tripmitra.services.UserDetailsService;
import com.acts.tripmitra.utilities.JwtUtil;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
    private UserDetailsRepository userDetailsRepository;
	
	@Autowired
	private JwtUtil jwtUtil;

	
    public UserDetailsDto getUserDetailsById(Integer id) {
    	Optional<UserDetails> optional = userDetailsRepository.findById(id);
    	if(optional.isPresent()) {
    		UserDetails details =  optional.get();
    		UserDetailsDto dto = new UserDetailsDto();
    		BeanUtils.copyProperties(details, dto);
    		dto.setUser(new UserResponseDto());
    		BeanUtils.copyProperties(details.getUser(), dto.getUser());
    		dto.setAddress(new AddressDto());
    		BeanUtils.copyProperties(details.getAddress(), dto.getAddress());
    		return dto;
    	}
    	return null;
    }
    
	public UserDetailsDto create(UserDetailsDto dto) {
        UserDetails userDetails = new UserDetails(); 
        BeanUtils.copyProperties(dto, userDetails);
        userDetailsRepository.save(userDetails);
        return dto;
    }
	
	@Override
	public UserDetailsDto getDetailsByUserId(String authHeader) {
	    String token = authHeader.substring(7); // Remove "Bearer "
	    Integer userId = jwtUtil.extractUserId(token); // Extract userId from JWT
	    UserDetails details = userDetailsRepository.findByUserId(userId)
	        .orElseThrow(() -> new RuntimeException("Details not found for userId: " + userId));
	    
	    UserDetailsDto dto = new UserDetailsDto();
	    BeanUtils.copyProperties(details, dto);
	    return dto;
	}



    public UserDetailsDto update(Integer id, UserDetailsDto dto) {
        Optional<UserDetails> optional = userDetailsRepository.findById(id);
        if (optional.isPresent()) {
            UserDetails userDetails = optional.get();
            userDetails.setPhoneNumber(dto.getPhoneNumber());
            userDetails.setAlterPhone(dto.getAlterPhone());
            userDetails.setGender(dto.getGender());
            userDetails.setDateOfBirth(dto.getDateOfBirth());
            userDetails.setImageUrl(dto.getImageUrl());
            Address newAddress = userDetails.getAddress();
            AddressDto address = dto.getAddress();
            newAddress.setAddressLine1(address.getAddressLine1());
            newAddress.setAddressLine2(address.getAddressLine2());
            newAddress.setDistrict(address.getDistrict());
            newAddress.setPincode(address.getPincode());
            newAddress.setState(address.getState());
            userDetails.setAddress(newAddress);
            userDetailsRepository.save(userDetails);
            return dto;
        }
        return null;
    }
    
    @Override
    public UserDetailsDto updateByToken(String authHeader, UserDetailsDto dto) {
        String token = authHeader.substring(7);
        Integer userId = jwtUtil.extractUserId(token);

        UserDetails userDetails = userDetailsRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Details not found for userId: " + userId));

        userDetails.setPhoneNumber(dto.getPhoneNumber());
        userDetails.setAlterPhone(dto.getAlterPhone());
        userDetails.setGender(dto.getGender());
        userDetails.setDateOfBirth(dto.getDateOfBirth());
        userDetails.setImageUrl(dto.getImageUrl());

        Address newAddress = userDetails.getAddress();
        AddressDto address = dto.getAddress();

        if (newAddress != null && address != null) {
            newAddress.setAddressLine1(address.getAddressLine1());
            newAddress.setAddressLine2(address.getAddressLine2());
            newAddress.setDistrict(address.getDistrict());
            newAddress.setPincode(address.getPincode());
            newAddress.setState(address.getState());
            userDetails.setAddress(newAddress);
        }

        userDetailsRepository.save(userDetails);

        return dto;
    }
    
    public void delete(Integer id) {
    	Optional<UserDetails> optional = userDetailsRepository.findById(id);
    	if(optional.isPresent())
    		userDetailsRepository.deleteById(id);
    }

	@Override
	public List<UserDetails> getAllUserDetails() {
		return userDetailsRepository.findAll();
	}
	
	public Page<UserDetails> getFilteredUsers(String gender, Boolean isBlocked, String keyword, Pageable pageable) {
	    return userDetailsRepository.findFilteredUsers(gender, isBlocked, keyword, pageable);
	}

	@Override
	public String blockUserById(Integer id) {
		Optional<UserDetails> optional = userDetailsRepository.findByUserId(id);
		UserDetails userDetails = optional.get();
		userDetails.setBlocked(true);
		userDetailsRepository.save(userDetails);
		return "User Blocked";
	}

	@Override
	public String unBlockUserById(Integer id) {
		Optional<UserDetails> optional = userDetailsRepository.findByUserId(id);
		UserDetails userDetails = optional.get();
		userDetails.setBlocked(false);
		userDetailsRepository.save(userDetails);
		return "User Unblocked";
	}

}
