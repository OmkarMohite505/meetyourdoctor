package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.enums.GenderType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "doctors")
public class Doctor extends Person{
	@Column(length = 12, unique = true)
	private String aadharNo;

	private double fees;

	private boolean isDoctorVerified;

	private boolean isDoctorSuspended;

	@ElementCollection(fetch = FetchType.EAGER) // mandatory to specify that foll is collection of basic type
	@CollectionTable(name = "doctor_hobbies", joinColumns = @JoinColumn(name = "doctor_id"), uniqueConstraints = @UniqueConstraint(columnNames = {
			"doctor_id", "hobby" }))
	@Column(name = "hobby", length = 40)
	private List<String> hobbies = new ArrayList<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "doctor_qualifications", joinColumns = @JoinColumn(name = "doctor_id"), uniqueConstraints = @UniqueConstraint(columnNames = {
			"doctor_id", "education_type" }))
	private Set<EducationalQualification> qualification = new HashSet<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@CollectionTable(name = "doctor_speciality", joinColumns = @JoinColumn(name = "doctor_id"), uniqueConstraints = @UniqueConstraint(columnNames = {
			"doctor_id", "speciality_type" }))
	private Set<Speciality> speciality = new HashSet<>();

	@JsonIgnore
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "login_id")
	private Login login;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "doctor_id")
	private Set<DoctorTimeTable> timetables;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "doctor_id")
	private Set<Address> address;


}
