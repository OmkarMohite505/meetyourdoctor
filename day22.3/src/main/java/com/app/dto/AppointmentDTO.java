package com.app.dto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.entities.Doctor;
import com.app.entities.Patient;
import com.app.entities.Payment;
import com.app.enums.AppointmentStatusEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AppointmentDTO {
	
	private Long appointmentId;
	
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private LocalDate appointmentDate;
	
	private LocalTime appointmentTime;
	
	private String appointmentType;
	
	private DoctorDTO doctor_id;
	private Doctor doctor;
	
	private PatientDTO patient_id;
	
	private AppointmentStatusEnum status;
	
	private String appointmentDescription;
	
	private String cancelledBy;
	
	private List<String> appointmentImage = new ArrayList<>();
	
	private PaymentDTO payment;
	private Payment pay;
	
	private Long doctorId;
	private Long patientId;
	private String paymentStatus;
	private String doctorName;
	private String patientName;

}
