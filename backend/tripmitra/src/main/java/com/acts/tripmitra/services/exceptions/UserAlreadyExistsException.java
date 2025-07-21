package com.acts.tripmitra.services.exceptions;

public class UserAlreadyExistsException extends Exception {

	/**
	 * 
	 */
	private static final long serialVersionUID = -3067969523877569423L;
	
	public UserAlreadyExistsException(String message) {
		super(message);
	}
}
