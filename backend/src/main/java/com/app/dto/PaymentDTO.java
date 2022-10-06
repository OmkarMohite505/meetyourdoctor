package com.app.dto;

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
public class PaymentDTO {

	private String orderId;

	private Double amount;

	private Double amount_paid;

	private String razorpayPaymentId;

	private String razorpayOrderId;

	private String razorpaySignature;

	private String status;
	
	private Long appointmentId;
	
	private Long patientId;

}
