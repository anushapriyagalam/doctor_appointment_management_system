package com.doctorappointment.appointmentservice.sequence;

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
@Document(collection = "appointmentid_sequence")
public class DatabaseSequence {
	
    @Id
    private String id;
    private Long seq;

}
