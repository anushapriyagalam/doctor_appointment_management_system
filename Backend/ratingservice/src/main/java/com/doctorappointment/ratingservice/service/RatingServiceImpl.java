package com.doctorappointment.ratingservice.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;

import com.doctorappointment.ratingservice.exception.RatingNotFoundException;
import com.doctorappointment.ratingservice.exception.RatingServiceException;
import com.doctorappointment.ratingservice.model.Rating;
import com.doctorappointment.ratingservice.repository.RatingRepository;
import com.doctorappointment.ratingservice.sequence.SequenceGenerator;

@Component
public class RatingServiceImpl implements RatingService {

	private static final Logger logger = LoggerFactory.getLogger(RatingServiceImpl.class);

	@Autowired
	private RatingRepository ratingRepository;

	@Autowired
	private SequenceGenerator sequenceGenerator;

	@Autowired
	private AppointmentProxy appointmentProxy;

	@Override
	public Rating addRating(Rating rating) {
		try {
			Rating appointmentDetails = appointmentProxy.getAppointment(rating.getAppointmentId());
			if (!canAddRating(appointmentDetails.getSelectedDate(), appointmentDetails.getSelectedTime())) {
				throw new RatingServiceException(
						"Rating can only be added after the appointment time has passed by at least 10 minutes");
			}
			rating.setRatingId(sequenceGenerator.generateSequence(Rating.SEQUENCE_NAME));
			rating.setAppointmentId(appointmentDetails.getAppointmentId());
			rating.setId(appointmentDetails.getId());
			rating.setName(appointmentDetails.getName());
			rating.setDoctorId(appointmentDetails.getDoctorId());
			rating.setDoctorName(appointmentDetails.getDoctorName());
			rating.setSelectedDate(appointmentDetails.getSelectedDate());
			rating.setSelectedTime(appointmentDetails.getSelectedTime());
			rating.setRatingDateTime(LocalDateTime.now());
			Rating savedRating = ratingRepository.save(rating);
			logger.info("Rating added successfully");
			return savedRating;
		} catch (Exception e) {
			logger.error("Error adding rating", e);
			throw new RatingServiceException("Error adding rating: " + e.getMessage(), e);
		}
	}

	private boolean canAddRating(LocalDate selectedDate, LocalTime selectedTime) {
		LocalDateTime selectedDateTime = LocalDateTime.of(selectedDate, selectedTime);
		LocalDateTime currentDateTime = LocalDateTime.now();
		return selectedDateTime.isBefore(currentDateTime.minusMinutes(10));
	}

	@Override
	public List<Rating> getAllRatings() {
		List<Rating> ratings = ratingRepository.findAll();
		logger.info("Retrieved " + ratings.size() + " ratings");
		return ratings;
	}

	@Override
	public Rating getRatingById(Long ratingId) {
		Optional<Rating> optionalRating = ratingRepository.findById(ratingId);
		Rating rating = optionalRating
				.orElseThrow(() -> new RatingNotFoundException("Rating with ID " + ratingId + " does not exist"));
		logger.info("Retrieved rating by ID " + ratingId);
		return rating;
	}

	@Override
	public Rating getRatingByDoctor(Long doctorId) {
		Optional<Rating> optionalRating = ratingRepository.findByDoctorId(doctorId);
		Rating rating = optionalRating.orElseThrow(
				() -> new RatingNotFoundException("Rating with doctor ID " + doctorId + " does not exist"));
		logger.info("Retrieved rating by doctor ID " + doctorId);
		return rating;
	}

	@Override
	public Rating updateRating(Long ratingId, Rating rating) {
		try {
			Optional<Rating> optionalRating = ratingRepository.findById(ratingId);
			if (optionalRating.isPresent()) {
				Rating ratingDetails = optionalRating.get();
				ratingDetails.setReview(rating.getReview());
				ratingDetails.setRatingDateTime(LocalDateTime.now());
				Rating updatedRating = ratingRepository.save(ratingDetails);
				logger.info("Rating updated successfully");
				return updatedRating;
			} else {
				throw new RatingNotFoundException("Rating with ID " + ratingId + " does not exist");
			}
		} catch (DataIntegrityViolationException e) {
			logger.error("Error updating rating");
			throw new RatingServiceException("Error updating appointment: " + e.getMessage(), e);
		}
	}

	@Override
	public void deleteRating(Long ratingId) {
		try {
			if (ratingRepository.existsById(ratingId)) {
				ratingRepository.deleteById(ratingId);
				logger.info("Rating deleted successfully");
			} else {
				throw new RatingNotFoundException("Rating with ID " + ratingId + " does not exist");
			}
		} catch (DataIntegrityViolationException e) {
			logger.error("Error deleting rating");
		}
	}

}
