package com.doctorappointment.appointmentservice.service;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.doctorappointment.doctorservice.model.Doctor;

@FeignClient(name = "doctorservice")
public interface DoctorProxy {

	@GetMapping("/doctor/{id}")
	Doctor getDoctor(@PathVariable Integer id);

	@PostMapping("/doctor/removeBookedDateTime")
	void removeSelectedTimeAndDate(@RequestParam Integer id,
			@RequestParam("availableDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate selectedDate,
			@RequestParam("availableTime") @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime selectedTime);

	@PostMapping("/doctor/addAvailableDateTime")
	void addAvailableDateTime(@RequestParam Integer id,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate availableDate,
			@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.TIME) LocalTime availableTime);

}
