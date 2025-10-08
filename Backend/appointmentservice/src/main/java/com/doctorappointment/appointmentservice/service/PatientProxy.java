package com.doctorappointment.appointmentservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.doctorappointment.appointmentservice.model.Appointment;

@FeignClient(name = "userservice")
public interface PatientProxy {

	@GetMapping("/user/{id}")
	Appointment getPatient(@PathVariable Integer id);
	
}
