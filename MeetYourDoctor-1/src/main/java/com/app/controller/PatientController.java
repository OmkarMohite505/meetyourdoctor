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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.entities.Login;
import com.app.entities.Patient;
import com.app.entities.Role;
import com.app.entities.UserRoles;
import com.app.service.ILoginService;
import com.app.service.IPatientService;
import com.app.service.IUserService;

import io.jsonwebtoken.lang.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/api/patient")
public class PatientController {
	@Autowired
	IPatientService patientService;
	@Autowired
	ILoginService loginService;
	@Autowired
	IUserService userService;

	@PostMapping("/register")
	public ResponseEntity<?> registerPatient(@RequestBody PatientDTO patient, Login login, Role role,
			SignUpRequest signUpRequest) {

		signUpRequest.setEmail(patient.getEmail());
		signUpRequest.setPassword(patient.getPassword());
		Set<String> list = new HashSet<String>();
		list.add("ROLE_PATIENT");
		signUpRequest.setRoles(list);
		signUpRequest.setUserName(patient.getFirstName());
		userService.registerPatient(signUpRequest, patient);
		return ResponseEntity.status(HttpStatus.CREATED).body("Registered Successfully");
	}

	@PostMapping("/profile_picture/{patientId}")
	public ResponseEntity<?> uploadImage(@PathVariable long patientId, @RequestParam MultipartFile imageFile)
			throws IOException {

		System.out.println("-------------------------------------");
		System.out.println("in upload image " + patientId);
		System.out.println("uploaded img file name " + imageFile.getOriginalFilename() + " content type "
				+ imageFile.getContentType() + " size " + imageFile.getSize()); // invoke
		return ResponseEntity.status(HttpStatus.OK).body(patientService.uploadProfilePicture(patientId, imageFile));

	}

}
