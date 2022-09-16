package com.app.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.enums.RoleEnum;
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
	
	@GetMapping("/{role}/{id}")
	public ResponseEntity<?> downloadImage(@PathVariable String role, @PathVariable long id) throws Exception{
		byte[] image = null;
		if(role.equals("ROLE_PATIENT"))
			image = patientService.restoreImage(id);
		else
			if(role.equals("ROLE_DOCTOR"))
				image = doctorService.restoreImage(id);
		return ResponseEntity.ok(image); 
	}
	@GetMapping("/path/{role}/{imagePath}")
	public ResponseEntity<?> downloadImageByPath(@PathVariable String role, @PathVariable String imagePath) throws IOException{
		log.info(imagePath);
		byte[] image = null;
		if(role.equals("ROLE_PATIENT"))
			image = patientService.restoreImageByPath(imagePath);
		else
			if(role.equals("ROLE_DOCTOR"))
				image = doctorService.restoreImageByPath(imagePath);
		return ResponseEntity.ok(image); 
	}

}
