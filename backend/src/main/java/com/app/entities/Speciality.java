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
	//Madhura commented : it's not an entity
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long specialityId;
	@Column(length=300)
	private String servicesProvided;
	@Column(length=500)
	private String specialityDescription;

	private String specialityPhoto;

//	@Override
//	public int hashCode() {
//		final int prime = 31;
//		int result = 1;
//		result = prime * result + ((specialityType == null) ? 0 : specialityType.hashCode());
//		return result;
//	}

//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		if (getClass() != obj.getClass())
//			return false;
//		Speciality other = (Speciality) obj;
//		if (specialityType != other.specialityType)
//			return false;
//		return true;
//	}

}
