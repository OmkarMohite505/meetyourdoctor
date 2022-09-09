package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.service.IAppointmentService;

@RestController
@CrossOrigin
@RequestMapping("/api/doctor/appointment")
public class DoctorAppointmentController {
	@Autowired
	private IAppointmentService appointmentService;
	
	@PostMapping("/upload_images/{appointmentId}/{patientId}")
	public ResponseEntity<?> uploadMultipleImages(@PathVariable long patientId, @PathVariable long appointmentId, @RequestParam MultipartFile[] imageFile) throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.uploadAppointmentPictures(appointmentId, patientId, imageFile));
	}

}
