package com.acts.tripmitra.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.dto.UserDto;
import com.acts.tripmitra.entity.Trip;
import com.acts.tripmitra.entity.User;
import com.acts.tripmitra.repository.UserRepository;
import com.acts.tripmitra.services.UserService;
import com.acts.tripmitra.utilities.JwtUtil;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;

    public User createUser(UserDto userDto) {
    	User user = new User();
    	BeanUtils.copyProperties(userDto, user);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @Override
    public User updateUserByToken(String authHeader, User updatedUser) {
        String token = authHeader.substring(7); // Remove "Bearer "
        Integer userId = jwtUtil.extractUserId(token);

        return userRepository.findById(userId).map(user -> {
            user.setUserEmail(updatedUser.getUserEmail());
            user.setUserName(updatedUser.getUserName());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    
    public User updateUser(Integer id, User updatedUser) {
        return userRepository.findById(id).map(user -> {
            user.setUserEmail(updatedUser.getUserEmail());
            user.setUserName(updatedUser.getUserName());
            user.setUserPassword(updatedUser.getUserPassword());
            user.setUserRole(updatedUser.getUserRole());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public List<Trip> getAllTripsByUserId(Integer id){
    	return userRepository.getAllTripByUserId(id);
    }

}

