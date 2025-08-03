package com.acts.tripmitra.services.exceptions;

public class UserNotFoundException extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 6204739961891282058L;

	public UserNotFoundException(String msg) {
		super(msg);
	}

}
