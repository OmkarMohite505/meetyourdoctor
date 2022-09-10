package com.app.entities;

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

import com.app.enums.GenderType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "admins")
public class Admin {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long adminId;
	
	@Column(length = 35)
	private String email;

	@Column(length = 20)
	String firstName;

	@Column(length = 25)
	String lastName;

	@Column(length = 14)
	String mobileNumber;

	@Column(length = 14)
	String alternateMobileNumber;

	@Enumerated(EnumType.STRING)
	GenderType gender;

	@Column(length = 250)
	private String profilePicture;

	@Column(length = 5, name = "blood_group")
	String bloodGroup;

	private LocalDate dob;

	// Patient has hobbies
	@ElementCollection//(fetch = FetchType.EAGER) // mandatory to specify that foll is collection of basic type
	@CollectionTable(name = "admin_hobbies", joinColumns = @JoinColumn(name = "admin_id"), uniqueConstraints = @UniqueConstraint(columnNames = {
			"admin_id", "hobby" }))
	@Column(name = "hobby", length = 40)
	private List<String> hobbies = new ArrayList<>();

	@OneToOne//(fetch = FetchType.EAGER)
	@JoinColumn(name = "login_id")
//	  @MapsId 
	private Login login;
	
	@OneToMany//(fetch = FetchType.EAGER)
	@JoinColumn(name = "address_id")
	private Set<PatientAddress> address;

}
