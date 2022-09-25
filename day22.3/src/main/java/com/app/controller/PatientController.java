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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
import com.app.dto.UpdatePasswordDTO;
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

	@GetMapping("/get_all_doctors_list_by_speciality/{speciality}")
	public ResponseEntity<?> getAllDoctorsListBySpeciality(@PathVariable SpecialityType speciality) {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getDoctorsListBySpeciality(speciality));
	}

	@GetMapping("/profile_picture/{imagePath}")
	public ResponseEntity<?> downloadImage(@PathVariable String imagePath, Image img) throws Exception {
		byte[] image = patientService.restoreImageByPath(imagePath);
		img.setImage(image);
		return ResponseEntity.status(HttpStatus.OK).body(img);
	}

	@GetMapping("/get_all_open_appointment/{patientId}")
	public ResponseEntity<?> getAllOpenAppointment(@PathVariable long patientId) throws Exception {
		return ResponseEntity.status(HttpStatus.OK)
				.body(appointmentService.getAllOpenOppointmentListForPatient(patientId));
	}

	@GetMapping("/get_all_closed_appointment/{patientId}")
	public ResponseEntity<?> getAllClosedAppointment(@PathVariable long patientId) throws Exception {
		return ResponseEntity.status(HttpStatus.OK)
				.body(appointmentService.getAllClosedOppointmentListForPatient(patientId));
	}

	@GetMapping("/get_all_doctors_list_by_town/{townName}")
	public ResponseEntity<?> getAllDoctorsListByTown(@PathVariable String townName) {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.findAllDoctorsByTown(townName));
	}

	@GetMapping("/get_all_doctors_list_by_city/{cityName}")
	public ResponseEntity<?> getAllDoctorsListByCity(@PathVariable String cityName) {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.findAllDoctorsByCity(cityName));
	}

	@GetMapping("/get_all_doctors_list_by_state/{stateName}")
	public ResponseEntity<?> getAllDoctorsListByState(@PathVariable String stateName) {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.findAllDoctorsByState(stateName));
	}

	@GetMapping("/get_all_doctors_list_by_pincode/{pincode}")
	public ResponseEntity<?> getAllDoctorsListByPincode(@PathVariable int pincode) {
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.findAllDoctorsByPincode(pincode));
	}
	
	@PatchMapping("/update_password")
	public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordDTO dto) {
		patientService.updatePassword(dto);
		return ResponseEntity.status(HttpStatus.OK).body("Password Updated Successfully");
	}
	@DeleteMapping("/{patientId}")
	public ResponseEntity<?> deleteDoctor(@PathVariable long patientId){
//		patientService.deletePatient(patientId);
//		return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
		return ResponseEntity.status(HttpStatus.OK).body("Currently You cannot delete account");
	}
}
