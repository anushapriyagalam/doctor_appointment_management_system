package com.doctorappointment.appointmentservice.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.doctorappointment.appointmentservice.model.Appointment;
import com.doctorappointment.appointmentservice.service.AppointmentServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/appointment")
public class AppointmentController {

	@Autowired
	private AppointmentServiceImpl appointmentService;
	
	@PostMapping
	public Appointment addAppointment(@RequestBody Appointment appointment) {
		return appointmentService.addAppointment(appointment);
	}
	
	@GetMapping
	public List<Appointment> getAllAppointments() {
		return appointmentService.getAllAppointments();
	}
	
	@GetMapping("/{appointmentId}")
	public Appointment getAppointmentById(@PathVariable Long appointmentId) {
		return appointmentService.getAppointmentById(appointmentId);
	}
	
	@GetMapping("/name/{name}")
	public List<Appointment> getAppointmentByPatient(@PathVariable String name) {
		return appointmentService.getAppointmentByPatient(name);
	}
	
	@GetMapping("/doctorName/{doctorName}")
	public List<Appointment> getAppointmentByDoctor(@PathVariable String doctorName) {
		return appointmentService.getAppointmentByDoctor(doctorName);
	}
	
	@PutMapping("/{appointmentId}")
	public Appointment updateAppointment(@PathVariable Long appointmentId, @RequestBody Appointment appointment) {
		return appointmentService.updateAppointment(appointmentId, appointment);
	}
	
	@DeleteMapping("/{appointmentId}")
	public void cancelAppointment(@PathVariable Long appointmentId) {
		appointmentService.deleteAppointment(appointmentId);
	}
}
