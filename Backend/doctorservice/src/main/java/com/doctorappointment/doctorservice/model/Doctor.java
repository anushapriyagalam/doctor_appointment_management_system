package com.doctorappointment.doctorservice.model;

import java.util.List;

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
@Document("doctor")
public class Doctor {
	
	@Id
	private int id;
    private String name;
    private String email;
    private String password;
    private String role;
    private int age;
    private String gender;
    private long phoneNumber;
	private String doctorImage;
	private String doctorQualification;
	private String doctorServiceName;
	private String doctorHospitalName;
	private String doctorHospitalLocation;
	private String doctorServiceDescription;
	private double doctorBookingAmount;
	private List<AvailableDateTime> availableDateTimes;
}
