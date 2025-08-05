package com.acts.tripmitra.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.acts.tripmitra.dto.AuthResponseDto;
import com.acts.tripmitra.dto.LoginRequestDto;
import com.acts.tripmitra.dto.UserDto;
import com.acts.tripmitra.entity.User;
import com.acts.tripmitra.repository.UserRepository;
import com.acts.tripmitra.services.AuthService;
import com.acts.tripmitra.services.exceptions.EmailAlreadyExistsException;
import com.acts.tripmitra.services.exceptions.InvalidCredentialsException;
import com.acts.tripmitra.utilities.JwtUtil;

@Service
public class AuthServiceImpl implements AuthService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public AuthResponseDto register(UserDto user) {
		if (userRepository.existsByUserEmail(user.getUserEmail())) {
			throw new EmailAlreadyExistsException("Email already registered");
		}

		User newUser = new User();
		newUser.setUserEmail(user.getUserEmail());
		newUser.setUserName(user.getUserName());
		newUser.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
		newUser.setUserRole("USER");

		userRepository.save(newUser);

		String token = jwtUtil.generateToken(newUser.getUserEmail(), newUser.getUserRole(), newUser.getUserId(), newUser.getUserName());
		return new AuthResponseDto(token);
	}

	@Override
	public AuthResponseDto login(LoginRequestDto request) {
		User user = userRepository.findByUserEmail(request.getUserEmail());
		if (user == null || !passwordEncoder.matches(request.getUserPassword(), user.getUserPassword())) {
			throw new InvalidCredentialsException("Invalid email or password");
		}

		String token = jwtUtil.generateToken(user.getUserEmail(), user.getUserRole(), user.getUserId(), user.getUserName());
		return new AuthResponseDto(token);
	}
}
