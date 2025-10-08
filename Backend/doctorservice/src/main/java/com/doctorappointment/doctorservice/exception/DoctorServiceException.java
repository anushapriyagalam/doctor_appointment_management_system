package com.doctorappointment.doctorservice.exception;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class DoctorServiceException extends RuntimeException {

	public DoctorServiceException(String message) {
        super(message);
    }

    public DoctorServiceException(String message, Throwable cause) {
        super(message, cause);
    }

}