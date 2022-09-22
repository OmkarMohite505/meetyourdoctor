package com.app.subdto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientAll {
private Long patientId;
	
	private String email;

	String firstName;

	String lastName;

	String mobileNumber;

	String alternateMobileNumber;

	String gender;

	private String profilePicture;

	String bloodGroup;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;

}
