package com.app.entities;

import javax.persistence.*;

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
@Table(name = "payments")
public class Payment {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long paymentId;
	
	private String orderId;

	private Double amount;

	/* private Double amount_paid; */

	private String razorpayPaymentId;

	/*
	 * private String razorpayOrderId;
	 * 
	 * private String razorpaySignature;
	 */
	@Column(length = 20)
	private String status;

//	@MapsId
//	@OneToOne
//	@JoinColumn(name = "appointment_id")
//	private Appointment appointmentId;

}
