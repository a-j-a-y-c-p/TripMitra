package com.acts.tripmitra.services.exceptions;

public class EmailAlreadyExistsException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1529814355922222507L;

	public EmailAlreadyExistsException(String msg) {
		super(msg);
	}

}
