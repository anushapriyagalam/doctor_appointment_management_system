package com.doctorappointment.ratingservice.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.doctorappointment.ratingservice.model.Rating;

public interface RatingRepository extends MongoRepository<Rating, Long>{

	Optional<Rating> findByDoctorId(Long doctorId);

}
