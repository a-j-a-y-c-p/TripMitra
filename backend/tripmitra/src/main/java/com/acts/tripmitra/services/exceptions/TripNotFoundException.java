package com.acts.tripmitra.services.exceptions;

public class TripNotFoundException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1400240619431245622L;

	public TripNotFoundException(String msg) {
		super(msg);
	}

}
