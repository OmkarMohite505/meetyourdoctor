package com.app.service;

import com.app.dto.PaymentDTO;

public interface IPaymentService {
	PaymentDTO savePaymentDetails(PaymentDTO paymentDTO) throws Exception;
	String updatePaymentDetails(PaymentDTO paymentDTO) throws Exception;

}
