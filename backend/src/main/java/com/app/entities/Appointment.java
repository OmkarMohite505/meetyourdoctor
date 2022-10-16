package com.app.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.app.enums.AppointmentStatusEnum;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Entity
@Table(name = "appointments")
public class Appointment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="appointment_id")
	private Long appointmentId;
	
	@Column(name="appointment_date")
	private LocalDate appointmentDate;
	
	@Column(name="appointment_time")
	private LocalTime appointmentTime;
	
	@ManyToOne
	@JoinColumn(name="doctor_id")
	private Doctor doctor;
	
	@ManyToOne
	@JoinColumn(name="patient_id")
	private Patient patient;
	
	@Column(length = 10)
	@Enumerated(EnumType.STRING)
	private AppointmentStatusEnum status;
	
	@Column(name="appointment_description", length = 500)
	private String appointmentDescription;
	
	@Column(name="cancelled_by", length=60)
	private String cancelledBy;
	
	@ElementCollection  // mandatory to specify that foll is collection of basic type
	@CollectionTable(name = "appointment_images", joinColumns = @JoinColumn(name="appointment_id"),uniqueConstraints = @UniqueConstraint(columnNames = {"appointment_id","appointment_image"}))
	@Column(name = "appointment_image",length = 300)
	private List<String> appointmentImage = new ArrayList<>();
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "payment_id")
	private Payment payment;

}
