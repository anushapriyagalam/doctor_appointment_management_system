package com.doctorappointment.doctorservice.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.doctorappointment.doctorservice.model.Doctor;


@Repository
public interface DoctorRepository extends MongoRepository<Doctor, Integer> {

	Optional<Doctor> findByName(String name);

	Optional<Doctor> findByDoctorServiceName(String doctorServiceName);

	Optional<Doctor> findByDoctorHospitalLocation(String doctorHospitalLocation);

}
