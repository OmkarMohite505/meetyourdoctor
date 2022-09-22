package com.app.dto;

import java.time.LocalTime;

import javax.persistence.*;

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
public class DoctorTimeTableDTO {
	
	Long doctorId;
	Long timeTableId;
	
	
	String weekday;

	LocalTime startTime;
	
	LocalTime endTime;
	
	Long slotDuration;
	
	LocalTime breakTime;
	
	String status;

}
