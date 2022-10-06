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
import com.app.entities.EducationalQualification;
import com.app.entities.Speciality;
import com.app.enums.GenderType;
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
public class DoctorFilter {
	Long doctorId;

	private String email;

	private String firstName;

	private String lastName;

	private String mobileNumber;

	private String aadharNo;

	private String profilePicture;

	private String alternateMobileNumber;

	private GenderType gender;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;

	private double fees;


	private List<String> hobbies = new ArrayList<>();

	private Set<EducationalQualification> qualification = new HashSet<>();

	private Set<Speciality> speciality = new HashSet<>();

	private Set<Address> address;

	
	private Set<DoctorTimeTableDTO> timetables;
	

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
		DoctorFilter other = (DoctorFilter) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		return true;
	}

}
