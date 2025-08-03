package com.acts.tripmitra.services.exceptions;

public class TripAlreadyExistsException extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 5348807744794869641L;

	public TripAlreadyExistsException(String msg) {
		super(msg);
	}

}
