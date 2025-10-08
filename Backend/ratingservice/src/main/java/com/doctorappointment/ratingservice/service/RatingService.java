package com.doctorappointment.ratingservice.service;

import java.util.List;

import com.doctorappointment.ratingservice.model.Rating;

public interface RatingService {
	
	Rating addRating(Rating rating);
	List<Rating> getAllRatings();
	Rating getRatingById(Long ratingId);
	Rating getRatingByDoctor(Long doctorId);
	Rating updateRating(Long ratingId, Rating rating);
	void deleteRating(Long ratingId);

}
