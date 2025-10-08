package com.doctorappointment.ratingservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.doctorappointment.ratingservice.model.Rating;

@FeignClient(name = "appointmentservice")
public interface AppointmentProxy {

	@GetMapping("/appointment/{appointmentId}")
	Rating getAppointment(@PathVariable Long appointmentId);
	
}

