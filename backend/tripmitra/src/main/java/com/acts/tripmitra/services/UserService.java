package com.acts.tripmitra.services;


import java.util.List;
import java.util.Optional;

import com.acts.tripmitra.dto.UserDto;
import com.acts.tripmitra.entity.User;


public interface UserService {
    public User createUser(UserDto userDto) ;
    public List<User> getAllUsers() ;
    public Optional<User> getUserById(Integer id) ;
    public void deleteUser(Integer id);
    public User updateUser(Integer id, User updatedUser) ;
}

