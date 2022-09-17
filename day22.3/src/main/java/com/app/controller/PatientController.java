package com.app.controller;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.Image;
import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.entities.Login;
import com.app.entities.Patient;
import com.app.entities.RoleEntity;
import com.app.enums.RoleEnum;
import com.app.enums.SpecialityType;
import com.app.service.IAppointmentService;
import com.app.service.IDoctorService;
import com.app.service.IPatientService;
import com.app.service.UserService;

import io.jsonwebtoken.lang.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/api/patient")
public class PatientController {
	@Autowired
	IPatientService patientService;
	@Autowired
	UserService userService;
	@Autowired
	IDoctorService doctorService;
	@Autowired
	IAppointmentService appointmentService;

	@PutMapping("/profile_picture/{patientId}")
	public ResponseEntity<?> uploadImage(@PathVariable long patientId, @RequestParam MultipartFile imageFile)
			throws IOException {

		System.out.println("-------------------------------------");
		System.out.println("in upload image " + patientId);
		System.out.println("uploaded img file name " + imageFile.getOriginalFilename() + " content type "
				+ imageFile.getContentType() + " size " + imageFile.getSize()); // invoke
		return ResponseEntity.status(HttpStatus.OK).body(patientService.uploadProfilePicture(patientId, imageFile));

	}

	@GetMapping("/get_all_doctors_list")
	public ResponseEntity<?> getAllDoctorsList() {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllDoctorsForPatient());
	}

	@GetMapping("/get_all_appointment_list/{patientId}")
	public ResponseEntity<?> getAllAppointmentList(@PathVariable long patientId) throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllAppointmentListForPatient(patientId));
	}

	@GetMapping("/get_all_doctors_list/{speciality}")
	public ResponseEntity<?> getAllDoctorsListBySpeciality(@PathVariable SpecialityType speciality) {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getDoctorsListBySpeciality(speciality));
	}

	@GetMapping("/profile_picture/{imagePath}")
	public ResponseEntity<?> downloadImage(@PathVariable String imagePath, Image img) throws Exception {
		byte[] image = patientService.restoreImageByPath(imagePath);
		img.setImage(image);
		return ResponseEntity.status(HttpStatus.OK).body(img);
	}
}
