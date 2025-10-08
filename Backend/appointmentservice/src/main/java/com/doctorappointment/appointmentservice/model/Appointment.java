package com.doctorappointment.appointmentservice.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.doctorappointment.doctorservice.model.AvailableDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("appointment")
public class Appointment {

    public static final String SEQUENCE_NAME = null;

    @Id
    private Long appointmentId;
    
    // Patient details
    private int id;
    private String name;
    private String email;
    private int age;
    private String gender;
    private Long phoneNumber;

    // Doctor details
    private int doctorId;
    private String doctorName;
    private String doctorServiceName;
    private String doctorHospitalName;
    private String doctorHospitalLocation;
    private double doctorBookingAmount;
    private List<AvailableDateTime> availableDateTimes;
    
    // Appointment details
    private LocalDateTime bookedDateTime;
    private LocalDate selectedDate;
    private LocalTime selectedTime;
    private String status;
}
