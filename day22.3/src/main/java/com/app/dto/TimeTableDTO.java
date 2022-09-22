package com.app.dto;

import java.util.Set;

import com.app.entities.DoctorTimeTable;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimeTableDTO {
	private Set<DoctorTimeTable> timetables;
	private long doctorId;

}
