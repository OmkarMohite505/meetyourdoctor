package com.app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long> {
	Optional<Patient> findByLoginEmail(String email);
}
