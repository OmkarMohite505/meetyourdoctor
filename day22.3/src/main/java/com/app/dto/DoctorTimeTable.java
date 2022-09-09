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
public class DoctorTimeTable {
	
	Long timeTableId;
	
//	@ManyToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name="doctor_id")
//	Doctor doctor;
	
	String weekday;

	LocalTime startTime;
	
	LocalTime endTime;
	
	Long slotDuration;
	
	LocalTime breakTime;
	
	String status;

}
