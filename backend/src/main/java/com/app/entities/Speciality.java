package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;

import com.app.enums.SpecialityType;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Embeddable
@EqualsAndHashCode(of = "specialityType")
public class Speciality {

	@Column(name = "speciality_type", length=60)
	@Enumerated(EnumType.STRING)
	private SpecialityType specialityType;
	@Column(length=300)
	private String servicesProvided;
	@Column(length=500)
	private String specialityDescription;

	private String specialityPhoto;

}
