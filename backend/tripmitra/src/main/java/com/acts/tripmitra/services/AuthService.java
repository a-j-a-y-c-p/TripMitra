package com.acts.tripmitra.services;

import com.acts.tripmitra.dto.AuthResponseDto;
import com.acts.tripmitra.dto.LoginRequestDto;
import com.acts.tripmitra.dto.UserDto;

public interface AuthService {

    AuthResponseDto register(UserDto request);
    AuthResponseDto login(LoginRequestDto request);
}
