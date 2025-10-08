package com.doctorappointment.doctorservice.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.doctorappointment.doctorservice.model.Doctor;
import com.doctorappointment.doctorservice.service.DoctorServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/doctor")
public class DoctorController {

	@Autowired
	private DoctorServiceImpl doctorService;
	
	@PostMapping
	public Doctor addDoctor(@RequestBody Doctor doctor) {
		return doctorService.addDoctor(doctor);
	}
	
	@GetMapping
	public List<Doctor> getAllDoctors() {
		return doctorService.getAllDoctors();
	}
	
	@GetMapping("/{id}")
	public Doctor getDoctorById(@PathVariable Integer id) {
		return doctorService.getDoctorById(id);
	}
	
	@GetMapping("/name/{name}")
	public Doctor getDoctorByName(@PathVariable String name) {
		return doctorService.getDoctorByName(name);
	}
	
	@GetMapping("/service/{doctorServiceName}")
	public Doctor getDoctorByServiceName(@PathVariable String doctorServiceName) {
		return doctorService.getDoctorByServiceName(doctorServiceName);
	}
	
	@GetMapping("/location/{doctorHospitalLocation}")
	public Doctor getDoctorByLocation(@PathVariable String doctorHospitalLocation) {
		return doctorService.getDoctorByLocation(doctorHospitalLocation);
	}
	
	@PutMapping("/{id}")
	public Doctor updateDoctor(@PathVariable Integer id, @RequestBody Doctor doctor) {
		return doctorService.updateDoctor(id, doctor);
	}
	
	@DeleteMapping("/{id}")
	public void deleteDoctor(@PathVariable Integer id) {
		doctorService.deleteDoctor(id);
	}
	
	@PostMapping("/removeBookedDateTime") 
	public void removeSelectedTimeAndDate(@RequestParam Integer id, @RequestParam LocalDate availableDate, @RequestParam LocalTime availableTime) {
		doctorService.removeSelectedTimeAndDate(id, availableDate, availableTime);
	}
	
	@PostMapping("/addAvailableDateTime") 
	public void addAvailableDateTime(@RequestParam Integer id, @RequestParam LocalDate availableDate, @RequestParam LocalTime availableTime) {
		doctorService.addAvailableDateTime(id, availableDate, availableTime);
	}
	
}

