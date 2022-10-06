package com.app.subdto;

import java.time.LocalDate;
import java.util.Set;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.PatientAddress;
import com.app.enums.RoleEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PatientAppointment {
	
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
	
	private Set<PatientAddress> address;

}
