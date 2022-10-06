package com.app.dto;

import javax.persistence.*;

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
public class EducationalQualificationDTO {

	private String educationType;

	private int year;

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
		EducationalQualificationDTO other = (EducationalQualificationDTO) obj;
		if (educationType != other.educationType)
			return false;
		return true;
	}

}
