package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

}
