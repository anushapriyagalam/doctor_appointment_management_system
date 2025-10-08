package com.doctorappointment.ratingservice.controller;

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

import com.doctorappointment.ratingservice.model.Rating;
import com.doctorappointment.ratingservice.service.RatingServiceImpl;

@CrossOrigin("*")
@RestController
@RequestMapping("/rating")
public class RatingController {

	@Autowired
	private RatingServiceImpl ratingService;
	
	@PostMapping
	public Rating addRating(@RequestBody Rating rating) {
		return ratingService.addRating(rating);
	}
	
	@GetMapping
	public List<Rating> getAllRatings() {
		return ratingService.getAllRatings();
	}
	
	@GetMapping("/{ratingId}")
	public Rating getRatingById(@PathVariable Long ratingId) {
		return ratingService.getRatingById(ratingId);
	}
	
	@GetMapping("/doctor/{doctorId}")
	public Rating getRatingByDoctor(@PathVariable Long doctorId) {
		return ratingService.getRatingByDoctor(doctorId);
	}
	
	@PutMapping("/{ratingId}")
	public Rating updateRating(@PathVariable Long ratingId, @RequestBody Rating rating) {
		return ratingService.updateRating(ratingId, rating);
	}
	
	@DeleteMapping("/{ratingId}")
	public void deleteRating(@PathVariable Long ratingId) {
		ratingService.deleteRating(ratingId);
	}
}
