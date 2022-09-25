package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.OTP;

public interface OtpRepository extends JpaRepository<OTP, String> {
	
	OTP findByEmailAndOtp(String email, int otp);

}
