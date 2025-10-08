package com.doctorappointment.doctorservice.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.doctorappointment.doctorservice.model.Doctor;

public interface DoctorService {

	Doctor addDoctor(Doctor doctor);
	List<Doctor> getAllDoctors();
	Doctor getDoctorById(Integer id);
	Doctor getDoctorByName(String name);
	Doctor getDoctorByServiceName(String doctorServiceName);
	Doctor getDoctorByLocation(String doctorHospitalLocation);
	Doctor updateDoctor(Integer id, Doctor doctor);
	void deleteDoctor(Integer id);
	void removeSelectedTimeAndDate(Integer id, LocalDate availableDate, LocalTime availableTime);
	void addAvailableDateTime(Integer id, LocalDate availableDate, LocalTime availableTime);
	
}
