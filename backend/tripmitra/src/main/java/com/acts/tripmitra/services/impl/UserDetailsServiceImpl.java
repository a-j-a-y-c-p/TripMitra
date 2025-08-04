package com.acts.tripmitra.services.impl;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.dto.AddressDto;
import com.acts.tripmitra.dto.UserDetailsDto;
import com.acts.tripmitra.entity.Address;
import com.acts.tripmitra.entity.User;
import com.acts.tripmitra.entity.UserDetails;
import com.acts.tripmitra.repository.AddressRepository;
import com.acts.tripmitra.repository.UserDetailsRepository;
import com.acts.tripmitra.repository.UserRepository;
import com.acts.tripmitra.services.UserDetailsService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
	
	@Autowired
    private UserDetailsRepository userDetailsRepository;
	
    public UserDetailsDto getUserDetailsById(Integer id) {
    	Optional<UserDetails> optional = userDetailsRepository.findById(id);
    	if(optional.isPresent()) {
    		UserDetails details =  optional.get();
    		UserDetailsDto dto = new UserDetailsDto();
    		BeanUtils.copyProperties(details, dto);
    		return dto;
    	}
    	return null;
    }
    
	public UserDetailsDto create(UserDetailsDto dto) { //create userDetails
        UserDetails userDetails = new UserDetails(); 
        BeanUtils.copyProperties(dto, userDetails);
        userDetailsRepository.save(userDetails);
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
            Address address = dto.getAddress();
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

    public void delete(Integer id) {
    	Optional<UserDetails> optional = userDetailsRepository.findById(id);
    	if(optional.isPresent())
    		userDetailsRepository.deleteById(id);
    }

}
