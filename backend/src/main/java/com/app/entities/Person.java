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


import javax.persistence.MappedSuperclass;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class Person {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length = 35, unique = true)
	private String email;

	@Column(name = "first_name", length = 20)
	private String firstName;

	@Column(name = "last_name", length = 25)
	private String lastName;

//	@Column(name = "mobile_number", length = 18, unique = true)
	@Column(name = "mobile_number", length = 18)
	private String mobileNumber;
    @Column(length = 250)
	private String profilePicture;

//	@Column(length = 18, unique = true)
	@Column(length = 18)
	private String alternateMobileNumber;

	@Column(length = 30)
	@Enumerated(EnumType.STRING)
	private GenderType gender;

	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate dob;

    @Lob
	private byte[] profileImgDB;

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
		Person other = (Person) obj;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		return true;
	}
}
