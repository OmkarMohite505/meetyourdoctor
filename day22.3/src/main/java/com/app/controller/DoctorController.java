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
import com.app.entities.RoleEntity;
import com.app.dto.RoleEnum;
import com.app.service.IDoctorService;
import com.app.service.IDoctorTimeTable;
import com.app.service.IPatientService;
import com.app.service.UserService;

import io.jsonwebtoken.lang.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/api/doctor")
public class DoctorController {
	@Autowired
	private IDoctorService doctorService;
	@Autowired
	private UserService userService;
	@Autowired
	private IDoctorTimeTable doctorTimeTable;
	
	
	
	@PostMapping("/profile_picture/{doctorId}")
	public ResponseEntity<?> uploadImage(@PathVariable long doctorId, @RequestParam MultipartFile imageFile)
			throws IOException {

		System.out.println("-------------------------------------");
		System.out.println("in upload image " + doctorId);
		System.out.println("uploaded img file name " + imageFile.getOriginalFilename() + " content type "
				+ imageFile.getContentType() + " size " + imageFile.getSize()); // invoke
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.uploadProfilePicture(doctorId, imageFile));

	}
	
	@PostMapping("/save_timetable")
	public ResponseEntity<?> saveTimetable(@RequestBody DoctorDTO doctorDTO) throws Exception{
		doctorTimeTable.saveDoctorTimetable(doctorDTO);
		return ResponseEntity.status(HttpStatus.OK).body("Saved TImetable");
	}
	
	@PostMapping("/update_timetable")
	public ResponseEntity<?> updateTimeTable(@RequestBody DoctorDTO doctorDTO){
		return ResponseEntity.status(HttpStatus.OK).body("Timetable Updated");
	}
}
