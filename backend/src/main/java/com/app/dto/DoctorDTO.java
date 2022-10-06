package com.app.dto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.Address;
import com.app.entities.BankAccount;
import com.app.entities.DoctorTimeTable;
import com.app.entities.EducationalQualification;
import com.app.entities.Speciality;
import com.app.enums.RoleEnum;
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
public class DoctorDTO {
	private Long loginId;

	private String message;

	private String jwt;

	Long doctorId;

	private String userName, password;
	private Set<RoleEnum> roles;
	private Set<String> hobbies;

	private String email;

	private String firstName;

	private String lastName;

	private String mobileNumber;

	private String aadharNo;

	private String profilePicture;

//	@Pattern(regexp="({13})")
	private String alternateMobileNumber;

	private String gender;

	private LocalDate dob;

	private double fees;

	private boolean isDoctorVerified;

	private boolean isDoctorSuspended;

	private Set<EducationalQualification> qualification;

	private Set<Speciality> speciality = new HashSet<>();

	private Set<DoctorTimeTable> timetables;

	private Set<Address> address;
	
	private BankAccount bankAccount;
	
//	private DoctorTimeTable doctorTimeTable;

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
		DoctorDTO other = (DoctorDTO) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		return true;
	}

}
