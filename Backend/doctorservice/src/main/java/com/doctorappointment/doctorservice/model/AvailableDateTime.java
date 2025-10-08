package com.doctorappointment.doctorservice.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AvailableDateTime {
    private LocalDate availableDate;
    private List<LocalTime> availableTime;
}
