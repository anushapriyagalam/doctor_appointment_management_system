package com.doctorappointment.appointmentservice.service;

import java.util.List;

import com.doctorappointment.appointmentservice.model.Appointment;

public interface AppointmentService {
	
	Appointment addAppointment(Appointment appointment);
	List<Appointment> getAllAppointments();
	Appointment getAppointmentById(Long appointmentId);
	List<Appointment> getAppointmentByPatient(String name);
	List<Appointment> getAppointmentByDoctor(String doctorName);
	Appointment updateAppointment(Long appointmentId, Appointment appointment);
	void deleteAppointment(Long appointmentId);

}
