package com.app.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.PatientDTO;
import com.app.entities.Patient;

public interface IPatientService {
	Patient registerPatient(Patient patient);
	
	String uploadProfilePicture(long empId, MultipartFile imageFile) throws IOException;
	
	byte[] restoreImage(String imagePath) throws Exception;
	
	PatientDTO getPatientDetails(String email)throws Exception;
}
