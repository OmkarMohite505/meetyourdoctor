package com.app.entities;

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
@Entity
@Table(name = "doctor_timetable")
public class DoctorTimeTable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="timetable_id")
	Long timeTableId;
	
//	@ManyToOne(cascade = CascadeType.ALL)
//	@JoinColumn(name="doctor_id")
//	Doctor doctor;
	
	@Column(length=15)
	String weekday;

	@Column(name="start_time")
	LocalTime startTime;
	
	@Column(name="end_time")
	LocalTime endTime;
	
	/*
	 * @Column(name="slot_duration") Long slotDuration;
	 */
	
	@Column(name="break_time")
	LocalTime breakTime;
	
	@Column(length=20)
	String status;
	
//	@ManyToOne
//	@JoinColumn(name = "doctor_id")
//	private Doctor doctor;

}
