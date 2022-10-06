package com.app.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.json.JSONObject;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.app.repository.AppointmentRepository;
import com.app.repository.PaymentRepository;
import com.app.dto.PaymentDTO;
import com.app.entities.Appointment;
import com.app.entities.Payment;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;

@Service
@Transactional
public class PaymentServiceImpl implements IPaymentService {
	
	@Value("${Razorpay.key_id}")
	private String key_id;
	@Value("${Razorpay.key_secret}")
	private String key_secret;
	
	@Autowired
	private PaymentRepository paymentRepository;
	@Autowired
	private AppointmentRepository appointmentRepository;
	@Autowired
	private ModelMapper mapper;

	@Override
	public PaymentDTO savePaymentDetails(PaymentDTO paymentDTO) throws Exception {
		Payment payment = new Payment();
		mapper.map(paymentDTO, payment);
		Appointment appointment = appointmentRepository.findById(paymentDTO.getAppointmentId())
				.orElseThrow(() -> new Exception("Appointment Detials Not found"));

		var client = new RazorpayClient(key_id, key_secret);
		JSONObject ob = new JSONObject();
		double amount = paymentDTO.getAmount() * 100;
		ob.put("amount", amount); // amount need to send on paise so thats why multiplied by 100
		ob.put("currency", "INR");
		ob.put("receipt", "txn_123");

		Order order = client.Orders.create(ob);
		PaymentDTO myOrderRecord = new PaymentDTO();
		String amt = (order.get("amount")).toString();
		myOrderRecord.setOrderId(order.get("id"));
		myOrderRecord.setAmount(Double.parseDouble(amt)/100);
		String amt_paid = (order.get("amount_paid")).toString();
		myOrderRecord.setAmount_paid(Double.parseDouble(amt_paid)/100);
		myOrderRecord.setStatus(order.get("status"));
		
		mapper.map(myOrderRecord, payment);
		Payment persistPayment = paymentRepository.save(payment);
		appointment.setPayment(persistPayment);
		return myOrderRecord;
	}

	@Override
	public String updatePaymentDetails(PaymentDTO paymentDTO) throws Exception {
		Appointment appointment = appointmentRepository.findById(paymentDTO.getAppointmentId())
				.orElseThrow(() -> new Exception("Appointment Detials Not found"));

		Payment payment = appointment.getPayment();
		/*
		 * payment.setAmount_paid(paymentDTO.getAmount_paid());
		 * payment.setRazorpayOrderId(paymentDTO.getRazorpayOrderId());
		 */
		payment.setRazorpayPaymentId(paymentDTO.getRazorpayPaymentId());
		/* payment.setRazorpaySignature(paymentDTO.getRazorpaySignature()); */
		payment.setStatus("PAID");
		return "Payment Records Updated";
	}

}
