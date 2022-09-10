package com.app.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.Address;
import com.app.entities.PatientAddress;
import com.app.enums.RoleEnum;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class PatientDTO {
	private Long loginId;
	
	private String message;
	
	private String jwt;
	
	private Long patientId;
	
	private String userName;

	private String password;

	private Set<RoleEnum> roles;

	private Set<String> hobbies;

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
