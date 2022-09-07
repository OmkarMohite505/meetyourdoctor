package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.DoctorDTO;
import com.app.entities.Doctor;

public interface IDoctorService {
	String uploadProfilePicture(long empId, MultipartFile imageFile) throws IOException;
	
	byte[] restoreImage(long id) throws Exception;
	
	DoctorDTO getDoctorDetails(String email)throws Exception;
}
