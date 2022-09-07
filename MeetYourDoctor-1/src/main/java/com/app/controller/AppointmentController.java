package com.app.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AppointmentDTO;
import com.app.service.IAppointmentService;

@RestController
@CrossOrigin
@RequestMapping("/api/patient/appointment")
public class AppointmentController {
	@Autowired
	private IAppointmentService appointmentService;
	
	@PostMapping
	public ResponseEntity<?> createPatientAppointment(@RequestBody AppointmentDTO appointmentDTO) throws Exception{
		return ResponseEntity.status(HttpStatus.CREATED).body(appointmentService.createAppointment(appointmentDTO));
	}
	
	@PutMapping
	public ResponseEntity<?> updateAppointment(@RequestBody AppointmentDTO appointmentDTO) throws Exception{
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(appointmentService.updateAppointment(appointmentDTO));
	}
	
	@PostMapping("/upload_images/{appointmentId}/{patientId}")
	public ResponseEntity<?> uploadMultipleImages(@PathVariable long patientId, @PathVariable long appointmentId, @RequestParam MultipartFile[] imageFile) throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.uploadAppointmentPictures(appointmentId, patientId, imageFile));
	}

}
