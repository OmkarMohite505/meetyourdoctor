package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.Image;
import com.app.enums.RoleEnum;
import com.app.service.IAdminService;
import com.app.service.IDoctorService;
import com.app.service.IPatientService;

import lombok.extern.slf4j.Slf4j;

@RestController
@CrossOrigin
@RequestMapping("/api/image")
@Slf4j
public class ImageServeController {
	@Autowired
	private IPatientService patientService;
	@Autowired
	private IDoctorService doctorService;
	@Autowired
	private IAdminService adminService;

	@GetMapping("/{role}/{id}")
	public ResponseEntity<?> downloadImage(@PathVariable String role, @PathVariable long id) throws Exception {
		byte[] image = null;
		if (role.equals("ROLE_PATIENT"))
			image = patientService.restoreImage(id);
		else if (role.equals("ROLE_DOCTOR"))
			image = doctorService.restoreImage(id);
//		return ResponseEntity.ok(image); 
		return ResponseEntity.status(HttpStatus.OK).body(image);
	}

	@GetMapping("/path/{role}/{imagePath}")
	public ResponseEntity<?> downloadImageByPath(@PathVariable String role, @PathVariable String imagePath)
			throws IOException {
		log.info(imagePath);
		byte[] image = null;
		if (role.equals("ROLE_PATIENT"))
			image = patientService.restoreImageByPath(imagePath);
		else if (role.equals("ROLE_DOCTOR"))
			image = doctorService.restoreImageByPath(imagePath);

		Image img = new Image();
		img.setImage(image);
//		return ResponseEntity.ok(image); 
		return ResponseEntity.status(HttpStatus.OK).body(img);
	}

	@GetMapping("/home_video")
	public ResponseEntity<?> downloadHomeVideo() throws IOException {
		return ResponseEntity.ok(adminService.downloadHomeVideo());
	}

	@PatchMapping("/ROLE_DOCTOR/speciality_picture/{doctorId}")
	public ResponseEntity<?> updateSpecialityPhoto(@RequestParam MultipartFile specialityPic,@PathVariable long doctorId)
			throws IOException {
		doctorService.updateSpecialityPhoto(doctorId, "empty", specialityPic);
		return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully");
	}

	@PutMapping("/ROLE_DOCTOR/educational_picture/{doctorId}")
	public ResponseEntity<?> uploadEducationalCertificates(@RequestParam MultipartFile[] imageFile,@PathVariable long doctorId) {
		doctorService.updateEducatiionPhoto(doctorId, imageFile);
		return ResponseEntity.status(HttpStatus.OK).body("Images uploaded successfully");
	}

	@PatchMapping("/ROLE_PATIENT/upload_profile_picture/{patientId}")
	public ResponseEntity<?> uploadPatientProfilePicture(@RequestParam MultipartFile profilePic,
			@PathVariable long patientId) throws IOException {
		patientService.uploadProfilePicture(patientId, profilePic);
		return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully");
	}

	@PatchMapping("/ROLE_DOCTOR/upload_profile_picture/{doctorId}")
	public ResponseEntity<?> uploadDoctorProfilePicture(@RequestParam MultipartFile profilePic,
			@PathVariable long doctorId) throws IOException {
		doctorService.uploadProfilePicture(doctorId, profilePic);
		return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully");
	}

}
