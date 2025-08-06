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

    public void delete(Integer id) {
    	Optional<UserDetails> optional = userDetailsRepository.findById(id);
    	if(optional.isPresent())
    		userDetailsRepository.deleteById(id);
    }

	@Override
	public List<UserDetails> getAllUserDetails() {
		return userDetailsRepository.findAll();
//		List<UserDetailsDto> userDto = new ArrayList<>();
//		BeanUtils.copyProperties(users, userDto);
//		System.out.print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+userDto.size());
//		System.out.print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+users.size());
//		return userDto;
	}
	
	public Page<UserDetails> getFilteredUsers(String gender, Boolean isBlocked, String keyword, Pageable pageable) {
	    return userDetailsRepository.findFilteredUsers(gender, isBlocked, keyword, pageable);
//	        .map(ud -> new UserListDto(
//	            ud.getUser().getUserId(),
//	            ud.getUser().getUserName(),
//	            ud.getUser().getUserEmail(),
//	            ud.getPhoneNumber(),
//	            ud.getGender()
//	        ));
	}

}
