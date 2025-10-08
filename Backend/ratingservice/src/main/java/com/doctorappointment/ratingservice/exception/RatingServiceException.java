package com.doctorappointment.ratingservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class RatingServiceException extends RuntimeException {

	public RatingServiceException(String message) {
        super(message);
    }

    public RatingServiceException(String message, Throwable cause) {
        super(message, cause);
    }

}
