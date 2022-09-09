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
public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long doctorId;

	@Column(length = 35)
	private String email;

	@Column(name = "first_name", length = 20)
	private String firstName;

	@Column(name = "last_name", length = 25)
	private String lastName;

	@Column(name = "mobile_number", length = 13)
	private String mobileNumber;

	@Column(length = 12)
	private String aadharNo;

	@Column(length = 250)
	private String profilePicture;

//	@Pattern(regexp="({13})")
	@Column(length = 12)
	private String alternateMobileNumber;

	@Column
	@Enumerated(EnumType.STRING)
	private GenderType gender;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;

	private double fees;

	private boolean isDoctorVerified;

	private boolean isDoctorSuspended;

	// Doctor has hobbies
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

	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name = "address_id")
	private Set<Address> address;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "login_id")
	private Login login;
	
	@OneToMany(fetch = FetchType.EAGER)
	@JoinColumn(name="tt_id")
	private Set<DoctorTimeTable> timetables;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Doctor other = (Doctor) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		return true;
	}

}
