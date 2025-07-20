package com.acts.tripmitra.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	@GetMapping("/")
	public String DemoFunc() {
		return "Hello";
	}
	
}
