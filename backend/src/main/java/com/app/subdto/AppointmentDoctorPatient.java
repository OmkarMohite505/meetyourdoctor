package com.app.subdto;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.app.entities.Doctor;
import com.app.entities.Patient;
import com.app.entities.Payment;
import com.app.enums.AppointmentStatusEnum;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
public class AppointmentDoctorPatient {
	
	private Long appointmentId;
	
	private LocalDate appointmentDate;
	
	private LocalTime appointmentTime;
	
	private String appointmentType;
	
	private Doctor doctor;
	
	private PatientAppointment patient;
	
	private AppointmentStatusEnum status;
	
	private String appointmentDescription;
	
	private String cancelledBy;
	
	private List<String> appointmentImage = new ArrayList<>();
	
	private Payment payment;

}
