package com.doctorappointment.appointmentservice.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import com.doctorappointment.appointmentservice.exception.AppointmentNotFoundException;
import com.doctorappointment.appointmentservice.exception.AppointmentServiceException;
import com.doctorappointment.appointmentservice.model.Appointment;
import com.doctorappointment.appointmentservice.repository.AppointmentRepository;
import com.doctorappointment.appointmentservice.sequence.SequenceGenerator;
import com.doctorappointment.doctorservice.model.Doctor;

@Component
public class AppointmentServiceImpl implements AppointmentService {

	private static final Logger logger = LoggerFactory.getLogger(AppointmentServiceImpl.class);

	@Autowired
	private AppointmentRepository appointmentRepository;

	@Autowired
	private SequenceGenerator sequenceGenerator;

	@Autowired
	private PatientProxy patientProxy;

	@Autowired
	private DoctorProxy doctorProxy;

	@Override
	public Appointment addAppointment(Appointment appointment) {
		try {
			appointment.setAppointmentId(sequenceGenerator.generateSequence(Appointment.SEQUENCE_NAME));
			Appointment patientDetails = patientProxy.getPatient(appointment.getId());
			appointment.setId(patientDetails.getId());
			appointment.setName(patientDetails.getName());
			appointment.setEmail(patientDetails.getEmail());
			appointment.setAge(patientDetails.getAge());
			appointment.setGender(patientDetails.getGender());
			appointment.setPhoneNumber(patientDetails.getPhoneNumber());
			Doctor doctorDetails = doctorProxy.getDoctor(appointment.getDoctorId());
			appointment.setDoctorId(doctorDetails.getId());
			appointment.setDoctorName(doctorDetails.getName());
			appointment.setDoctorServiceName(doctorDetails.getDoctorServiceName());
			appointment.setDoctorHospitalName(doctorDetails.getDoctorHospitalName());
			appointment.setDoctorHospitalLocation(doctorDetails.getDoctorHospitalLocation());
			appointment.setDoctorBookingAmount(doctorDetails.getDoctorBookingAmount());
			appointment.setAvailableDateTimes(doctorDetails.getAvailableDateTimes());
			appointment.setBookedDateTime(LocalDateTime.now());
			appointment.setStatus("BOOKED");

			doctorProxy.removeSelectedTimeAndDate(appointment.getDoctorId(), appointment.getSelectedDate(),
					appointment.getSelectedTime());

			Appointment savedAppointment = appointmentRepository.save(appointment);
			logger.info("Appointment booked successfully");
			return savedAppointment;
		} catch (Exception e) {
			logger.error("Error adding appointment", e);
			throw new AppointmentServiceException("Error adding appointment: " + e.getMessage(), e);
		}
	}

	@Override
	public List<Appointment> getAllAppointments() {
		List<Appointment> appointments = appointmentRepository.findAll();
		logger.info("Retrieved " + appointments.size() + " appointments");
		return appointments;
	}

	@Override
	public Appointment getAppointmentById(Long appointmentId) {
		Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
		Appointment appointment = optionalAppointment.orElseThrow(
				() -> new AppointmentNotFoundException("Appointment with ID " + appointmentId + " does not exist"));
		logger.info("Retrieved appointment by ID " + appointmentId);
		return appointment;
	}

	@Override
	public List<Appointment> getAppointmentByPatient(String name) {
		List<Appointment> appointments = appointmentRepository.findByName(name);
		if (appointments.isEmpty()) {
			throw new AppointmentNotFoundException("No appointments found for patient name " + name);
		}
		logger.info("Retrieved " + appointments.size() + " appointments for patient name " + name);
		return appointments;
	}
	
	@Override
	public List<Appointment> getAppointmentByDoctor(String doctorName) {
		List<Appointment> appointments = appointmentRepository.findByDoctorName(doctorName);
		if (appointments.isEmpty()) {
			throw new AppointmentNotFoundException("No appointments found for doctor name " + doctorName);
		}
		logger.info("Retrieved " + appointments.size() + " appointments for doctor name " + doctorName);
		return appointments;
	}

	@Override
	public Appointment updateAppointment(Long appointmentId, Appointment appointment) {
		try {
			Optional<Appointment> optionalAppointment = appointmentRepository.findById(appointmentId);
			if (optionalAppointment.isPresent()) {
				Appointment appointmentDetails = optionalAppointment.get();
				appointmentDetails.setStatus("CANCELLED");
				doctorProxy.addAvailableDateTime(appointmentDetails.getDoctorId(), appointmentDetails.getSelectedDate(),
						appointmentDetails.getSelectedTime());
				Appointment updatedAppointment = appointmentRepository.save(appointmentDetails);
				logger.info("Appointment updated successfully");
				return updatedAppointment;
			} else {
				throw new AppointmentNotFoundException("Appointment with ID " + appointmentId + " does not exist");
			}
		} catch (DataIntegrityViolationException e) {
			logger.error("Error updating appointment", e);
			throw new AppointmentServiceException("Error updating appointment: " + e.getMessage(), e);
		}
	}

	@Override
	public void deleteAppointment(Long appointmentId) {
		try {
			if (appointmentRepository.existsById(appointmentId)) {
				appointmentRepository.deleteById(appointmentId);
				logger.info("Appointment deleted successfully");
			} else {
				throw new AppointmentNotFoundException("Appointment with ID " + appointmentId + " does not exist");
			}
		} catch (DataIntegrityViolationException e) {
			logger.error("Error deleting appointment", e);
			throw new AppointmentServiceException("Error deleting appointment: " + e.getMessage(), e);
		}
	}
}
