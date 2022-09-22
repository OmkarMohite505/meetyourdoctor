package com.app.service;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.PatientDTO;
import com.app.dto.UpdatePasswordDTO;
import com.app.entities.Patient;
import com.app.subdto.PatientAll;

public interface IPatientService {
	Patient registerPatient(Patient patient);
	
	String uploadProfilePicture(long empId, MultipartFile imageFile) throws IOException;
	
	byte[] restoreImage(long id) throws Exception;
	
	PatientDTO getPatientDetails(String email)throws Exception;

	byte[] restoreImageByPath(String imagePath) throws IOException;
	
	List<PatientAll> getAllPatientList();
	
	void updatePassword(UpdatePasswordDTO dto);
	
	void deletePatient(long patientId);
}
