package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AppointmentDTO;
import com.app.dto.PaymentDTO;
import com.app.service.IPaymentService;

@RestController
@CrossOrigin
@RequestMapping("/api/patient/appointment/pay")
public class PaymentController {
	@Autowired
	private IPaymentService paymentService;
	
	@PostMapping("/create_order")
	public ResponseEntity<?> createPaymentOrder(@RequestBody PaymentDTO paymentDTO) throws Exception {
		return ResponseEntity.status(HttpStatus.CREATED).body(paymentService.savePaymentDetails(paymentDTO));
	}
	
	@PostMapping("/update_order")
	public ResponseEntity<?> updatePaymentOrder(@RequestBody PaymentDTO paymentDTO) throws Exception{
		return ResponseEntity.status(HttpStatus.OK).body(paymentService.updatePaymentDetails(paymentDTO));
	}

}
