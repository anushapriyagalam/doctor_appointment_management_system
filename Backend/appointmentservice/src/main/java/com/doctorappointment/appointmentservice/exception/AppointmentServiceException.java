package com.doctorappointment.appointmentservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class AppointmentServiceException extends RuntimeException {

	public AppointmentServiceException(String message) {
        super(message);
    }

    public AppointmentServiceException(String message, Throwable cause) {
        super(message, cause);
    }

}
