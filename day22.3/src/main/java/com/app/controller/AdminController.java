package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.IDoctorService;

@RestController
@CrossOrigin
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private IDoctorService doctorService;

	@GetMapping("/get_all_doctors_list")
	public ResponseEntity<?> getAllDoctorsList() {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllDoctorsListForAdmin());
	}

	@GetMapping("/verify_doctor/{doctorId}")
	public ResponseEntity<?> verifyDoctor(@PathVariable long doctorId) {
		doctorService.verifyDoctor(doctorId);
		return ResponseEntity.status(HttpStatus.OK).body("Doctor verified");
	}

	@GetMapping("/suspend_doctor/{doctorId}")
	public ResponseEntity<?> suspendDoctor(@PathVariable long doctorId) {
		doctorService.suspendDoctor(doctorId);
		return ResponseEntity.status(HttpStatus.OK).body("Doctor Suspended");
	}

	@GetMapping("/un_verify_doctor/{doctorId}")
	public ResponseEntity<?> unverifyDoctor(@PathVariable long doctorId) {
		doctorService.unVerifyDoctor(doctorId);
		return ResponseEntity.status(HttpStatus.OK).body("Doctor un-verified");
	}

	@GetMapping("/remove_doctor_suspension/{doctorId}")
	public ResponseEntity<?> removeDoctorSuspension(@PathVariable long doctorId) {
		doctorService.removeDoctorSuspension(doctorId);
		return ResponseEntity.status(HttpStatus.OK).body("Doctor Suspension removed");
	}

	@GetMapping("/un_verified_doctors_list")
	public ResponseEntity<?> getUnVerifiedDoctsList() {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getUnVerifiedDoctorsList());
	}

	@GetMapping("/verified_doctors_list")
	public ResponseEntity<?> getVerifiedDoctsList() {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getVerifiedDoctorsList());
	}

	@GetMapping("/suspended_doctors_list")
	public ResponseEntity<?> getSuspendedDoctosList() {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getSuspendedDoctorsList());
	}

	@GetMapping("/active_doctors_list")
	public ResponseEntity<?> getActiveDoctosList() {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getActiveDoctorsList());
	}

}
