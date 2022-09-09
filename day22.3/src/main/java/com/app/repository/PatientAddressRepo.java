package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.PatientAddress;

public interface PatientAddressRepo extends JpaRepository<PatientAddress, Long> {

}
