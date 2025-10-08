package com.doctorappointment.doctorservice.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import com.doctorappointment.doctorservice.exception.DoctorNotFoundException;
import com.doctorappointment.doctorservice.exception.DoctorServiceException;
import com.doctorappointment.doctorservice.model.AvailableDateTime;
import com.doctorappointment.doctorservice.model.Doctor;
import com.doctorappointment.doctorservice.repository.DoctorRepository;

@Component
public class DoctorServiceImpl implements DoctorService {

	private static final Logger logger = LoggerFactory.getLogger(DoctorServiceImpl.class);
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private DoctorProxy doctorProxy;
	
	public Doctor addDoctor(Doctor doctor) {
        try {
            Doctor doctorDetails = doctorProxy.getDoctor(doctor.getId());
            doctor.setName(doctorDetails.getName());
            doctor.setEmail(doctorDetails.getEmail());
            doctor.setPassword(doctorDetails.getPassword());
            doctor.setRole(doctorDetails.getRole());
            doctor.setAge(doctorDetails.getAge());
            doctor.setGender(doctorDetails.getGender());
            doctor.setPhoneNumber(doctorDetails.getPhoneNumber());
            Doctor savedDoctor = doctorRepository.save(doctor);
            logger.info("Doctor added successfully");
            return savedDoctor;
        } catch (Exception e) {
            logger.error("Error adding doctor", e);
            throw new DoctorServiceException("Error adding doctor: " + e.getMessage(), e);
        }
    }

	@Override
	public List<Doctor> getAllDoctors() {
		List<Doctor> doctors = doctorRepository.findAll();
		logger.info("Retrieved " + doctors.size() + " doctors");
		return doctors;
	}

	@Override
	public Doctor getDoctorById(Integer id) {
		Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
		Doctor doctor = optionalDoctor.orElseThrow(() -> new DoctorNotFoundException("Doctor with ID " + id + " does not exist"));
		logger.info("Retrieved doctor by ID " + id);
		return doctor;
	}

	@Override
	public Doctor getDoctorByName(String name) {
		Optional<Doctor> optionalDoctor = doctorRepository.findByName(name);
		Doctor doctor = optionalDoctor.orElseThrow(() -> new DoctorNotFoundException("Doctor with name " + name + " does not exist"));
		logger.info("Retrieved doctor by name " + name);
		return doctor;
	}

	@Override
	public Doctor getDoctorByLocation(String doctorHospitalLocation) {
		Optional<Doctor> optionalDoctor = doctorRepository.findByDoctorHospitalLocation(doctorHospitalLocation);
		Doctor doctor = optionalDoctor.orElseThrow(() -> new DoctorNotFoundException("No doctor available at this " + doctorHospitalLocation));
		logger.info("Retrieved doctor by location " + doctorHospitalLocation);
		return doctor;
	}
	
	@Override
	public Doctor getDoctorByServiceName(String doctorServiceName) {
		Optional<Doctor> optionalDoctor = doctorRepository.findByDoctorServiceName(doctorServiceName);
		Doctor doctor = optionalDoctor.orElseThrow(() -> new DoctorNotFoundException("Doctor with service " + doctorServiceName + " does not exist"));
		logger.info("Retrieved doctor by service " + doctorServiceName);
		return doctor;
	}

	@Override
	public Doctor updateDoctor(Integer id, Doctor doctor) {
		try {
			Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
			if (optionalDoctor.isPresent()) {
				Doctor doctorDetails = optionalDoctor.get();
				doctorDetails.setName(doctor.getName());
				doctorDetails.setAge(doctor.getAge());
				doctorDetails.setGender(doctor.getGender());
				doctorDetails.setDoctorImage(doctor.getDoctorImage());
				doctorDetails.setDoctorQualification(doctor.getDoctorQualification());
				doctorDetails.setDoctorServiceName(doctor.getDoctorServiceName());
				doctorDetails.setDoctorHospitalName(doctor.getDoctorHospitalName());
				doctorDetails.setDoctorHospitalLocation(doctor.getDoctorHospitalLocation());
				doctorDetails.setDoctorServiceDescription(doctor.getDoctorServiceDescription());
				doctorDetails.setDoctorBookingAmount(doctor.getDoctorBookingAmount());
				doctorDetails.setAvailableDateTimes(doctor.getAvailableDateTimes());
				Doctor updatedDoctor = doctorRepository.save(doctorDetails);
				logger.info("Doctor details updated successfully");
				return updatedDoctor;
			} else {
				throw new DoctorNotFoundException("Doctor with ID " + id + " does not exist");
			} 
		} catch (DataIntegrityViolationException e) {
			logger.error("Error updating doctor", e);
			throw new DoctorServiceException("Error updating doctor: " + e.getMessage(), e);
		}
	}

	@Override
	public void deleteDoctor(Integer id) {
		try {
			if (doctorRepository.existsById(id)) {
				doctorRepository.deleteById(id);
				logger.info("Doctor deleted successfully");
			} else {
				throw new DoctorNotFoundException("Doctor with ID " + id + " does not exist");
			} 
		} catch (DataIntegrityViolationException e) {
			logger.error("Error deleting doctor", e);
			throw new DoctorServiceException("Error deleting doctor: " + e.getMessage(), e);
		}
	}

	@Override
	public void removeSelectedTimeAndDate(Integer id, LocalDate availableDate, LocalTime availableTime) {
	    try {
	        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
	        if (optionalDoctor.isPresent()) {
	            Doctor doctor = optionalDoctor.get();
	            List<AvailableDateTime> availableDateTimes = doctor.getAvailableDateTimes();

	            // Use an iterator to safely remove items from the list
	            Iterator<AvailableDateTime> dateTimeIterator = availableDateTimes.iterator();
	            while (dateTimeIterator.hasNext()) {
	                AvailableDateTime availableDateTime = dateTimeIterator.next();
	                
	                // Check if the availableDate matches
	                if (availableDateTime.getAvailableDate().equals(availableDate)) {
	                    List<LocalTime> times = availableDateTime.getAvailableTime();
	                    
	                    // Remove the specified time from the list
	                    boolean timeRemoved = times.remove(availableTime);
	                    
	                    // If time was removed and the list is now empty, remove the date entry
	                    if (timeRemoved && times.isEmpty()) {
	                        dateTimeIterator.remove();
	                    }
	                    
	                    // No need to check further if the date is removed
	                    break;
	                }
	            }

	            // Clean up past dates and times
	            dateTimeIterator = availableDateTimes.iterator();
	            while (dateTimeIterator.hasNext()) {
	                AvailableDateTime availableDateTime = dateTimeIterator.next();
	                if (availableDateTime.getAvailableDate().isBefore(LocalDate.now())) {
	                    dateTimeIterator.remove();
	                } else if (availableDateTime.getAvailableDate().equals(LocalDate.now())) {
	                    // Remove times that are before the current time
	                    availableDateTime.getAvailableTime().removeIf(time -> time.isBefore(LocalTime.now()));
	                    // Remove the entry if no times remain
	                    if (availableDateTime.getAvailableTime().isEmpty()) {
	                        dateTimeIterator.remove();
	                    }
	                }
	            }

	            doctorRepository.save(doctor);
	            logger.info("Updated doctor availability for doctor ID " + id);
	        } else {
	            throw new DoctorNotFoundException("Doctor with ID " + id + " does not exist");
	        }
	    } catch (DoctorNotFoundException e) {
	        logger.error("Doctor not found", e);
	        throw e;
	    } catch (Exception e) {
	        logger.error("Error updating doctor availability", e);
	        throw new DoctorServiceException("Error updating doctor availability: " + e.getMessage(), e);
	    }
	}
	
	@Override
	public void addAvailableDateTime(Integer id, LocalDate availableDate, LocalTime availableTime) {
	    try {
	        logger.info("Adding available date {} and time {} for doctor ID {}", availableDate, availableTime, id);
	        Optional<Doctor> optionalDoctor = doctorRepository.findById(id);
	        if (optionalDoctor.isPresent()) {
	            Doctor doctor = optionalDoctor.get();
	            List<AvailableDateTime> availableDateTimes = doctor.getAvailableDateTimes();

	            // Check if the date already exists
	            AvailableDateTime availableDateTime = availableDateTimes.stream()
	                .filter(dateTime -> dateTime.getAvailableDate().equals(availableDate))
	                .findFirst()
	                .orElse(null);

	            if (availableDateTime == null) {
	                // Add new date if not exists
	                availableDateTime = new AvailableDateTime();
	                availableDateTime.setAvailableDate(availableDate);
	                availableDateTime.setAvailableTime(new ArrayList<>());
	                availableDateTimes.add(availableDateTime);
	            }

	            // Add the time to the available date
	            availableDateTime.getAvailableTime().add(availableTime);

	            // Save the doctor
	            doctorRepository.save(doctor);
	            logger.info("Added available date and time for doctor ID {}", id);
	        } else {
	            throw new DoctorNotFoundException("Doctor with ID " + id + " does not exist");
	        }
	    } catch (Exception e) {
	        logger.error("Error adding available date and time", e);
	        throw new DoctorServiceException("Error adding available date and time: " + e.getMessage(), e);
	    }
	}

}
