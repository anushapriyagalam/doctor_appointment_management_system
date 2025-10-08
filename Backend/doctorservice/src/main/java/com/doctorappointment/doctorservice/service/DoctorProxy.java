package com.doctorappointment.doctorservice.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.doctorappointment.doctorservice.model.Doctor;

@FeignClient(name = "userservice")
public interface DoctorProxy {

	@GetMapping("/user/{id}")
	Doctor getDoctor(@PathVariable Integer id);
	
}
