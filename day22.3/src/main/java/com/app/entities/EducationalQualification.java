package com.app.entities;

import javax.persistence.*;

import com.app.enums.EduType;

import lombok.AllArgsConstructor;
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
public class EducationalQualification {

	@Enumerated(EnumType.STRING)
	@Column(name = "education_type", length = 20)
	private EduType educationType;

	private int year;

	@Column(name = "marks")
	private double percentageMarks;

	private String certificatePhoto;

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((educationType == null) ? 0 : educationType.hashCode());
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
		EducationalQualification other = (EducationalQualification) obj;
		if (educationType != other.educationType)
			return false;
		return true;
	}

}
