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

import com.app.dto.DoctorDTO;
import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.entities.Login;
import com.app.entities.Patient;
import com.app.entities.Role;
import com.app.entities.UserRoles;
import com.app.service.IDoctorService;
import com.app.service.ILoginService;
import com.app.service.IPatientService;
import com.app.service.IUserService;

import io.jsonwebtoken.lang.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/api/doctor")
public class DoctorController {
	@Autowired
	IDoctorService doctorService;
	@Autowired
	ILoginService loginService;
	@Autowired
	IUserService userService;
	@PostMapping("/register")
	public ResponseEntity<?> registerPatient(@RequestBody DoctorDTO doctor, Login login,  Role role, SignUpRequest signUpRequest){
		
		 signUpRequest.setEmail(doctor.getEmail());
		 signUpRequest.setPassword(doctor.getPassword());
		 Set<String> list = new HashSet<String>();
		 list.add("ROLE_DOCTOR");
		 signUpRequest.setRoles(list);
		 signUpRequest.setUserName(doctor.getFirstName());
		 userService.registerDoctor(signUpRequest,doctor);
		return ResponseEntity.status(HttpStatus.CREATED).body("Registered Successfully");
	}
	
	@PostMapping("/profile_picture/{doctorId}")
	public ResponseEntity<?> uploadImage(@PathVariable long doctorId, @RequestParam MultipartFile imageFile)
			throws IOException {

		System.out.println("-------------------------------------");
		System.out.println("in upload image " + doctorId);
		System.out.println("uploaded img file name " + imageFile.getOriginalFilename() + " content type "
				+ imageFile.getContentType() + " size " + imageFile.getSize()); // invoke
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.uploadProfilePicture(doctorId, imageFile));

	}
}
