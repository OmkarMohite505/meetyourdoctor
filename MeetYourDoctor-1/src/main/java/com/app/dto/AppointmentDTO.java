package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentDTO {
	
	private Long appointmentId;
	private LocalDate appointmentDate;
	
	private LocalTime appointmentTime;
	
	private String appointmentType;
	
	private DoctorDTO doctor_id;
	
	private PatientDTO patient_id;
	
	private String status;
	
	private String appointmentDescription;
	
	private String cancelledBy;
	
	private List<String> appointmentImage = new ArrayList<>();
	
	private PaymentDTO payment;
	
	private Long doctorId;
	private Long patientId;

}
