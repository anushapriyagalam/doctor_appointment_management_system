package com.doctorappointment.ratingservice.sequence;

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
@Document(collection = "ratingid_sequence")
public class DatabaseSequence {
	
    @Id
    private String id;
    private Long seq;

}

