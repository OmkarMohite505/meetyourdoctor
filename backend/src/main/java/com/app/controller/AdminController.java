package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.service.IAdminService;
import com.app.service.IDoctorService;
import com.app.service.IPatientService;

@RestController
@CrossOrigin
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private IDoctorService doctorService;
	@Autowired
	private IAdminService adminService;
	@Autowired
	private IPatientService patientService;

	@GetMapping("/get_all_doctors_list")
	public ResponseEntity<?> getAllDoctorsList() {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllDoctorsListForAdmin());
	}
	@GetMapping("/get_all_patients_list")
	public ResponseEntity<?> getAllPatientsList() {
		return ResponseEntity.status(HttpStatus.OK).body(patientService.getAllPatientList());
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
	@PostMapping("/upload_home_video")
	public ResponseEntity<?> uploadHomeVideo(@RequestParam MultipartFile videoFile) throws IOException{
		adminService.storeHomeVideo(videoFile);
		return ResponseEntity.status(HttpStatus.OK).body("Home Vidoe uploaded Successfully");
	}

}
