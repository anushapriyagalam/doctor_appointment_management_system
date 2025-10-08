package com.doctorappointment.appointmentservice.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.doctorappointment.appointmentservice.model.Appointment;

@Repository
public interface AppointmentRepository extends MongoRepository<Appointment, Long> {

	List<Appointment> findByName(String name);
	List<Appointment> findByDoctorName(String doctorName);

}
