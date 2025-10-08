package com.doctorappointment.ratingservice.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("rating")
public class Rating {
	
	public static final String SEQUENCE_NAME = null;
	
	@Id
	private Long ratingId;
	private Long appointmentId;
	private int id;
	private String name;
	private Long doctorId;
	private String doctorName;
	private LocalDateTime bookedDateTime;
	private LocalDate selectedDate;
    private LocalTime selectedTime;
	private int rating;
	private String review;
	private LocalDateTime ratingDateTime;
	
}
