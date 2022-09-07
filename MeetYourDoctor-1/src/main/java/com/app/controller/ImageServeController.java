package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.IDoctorService;
import com.app.service.IPatientService;

@RestController
@CrossOrigin
@RequestMapping("/api/image")
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

}
