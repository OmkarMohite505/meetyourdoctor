package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.DoctorDTO;
import com.app.dto.DoctorDTOFilter;
import com.app.dto.DoctorFilter;
import com.app.entities.Doctor;
import com.app.enums.SpecialityType;

public interface IDoctorService {
	String uploadProfilePicture(long empId, MultipartFile imageFile) throws IOException;
	
	byte[] restoreImage(long id) throws Exception;
	
	DoctorDTO getDoctorDetails(String email)throws Exception;
	
	List<Doctor> getAllDoctorsForPatient();
	
	List<Doctor> getAllDoctorsListForAdmin();
	
	void verifyDoctor(long doctorId);
	
	void suspendDoctor(long doctorId);
	
	void unVerifyDoctor(long doctorId);
	
	void removeDoctorSuspension(long doctorId);
	
	List<Doctor> getDoctorsListBySpeciality(SpecialityType speciality);
	
	List<Doctor> getUnVerifiedDoctorsList();
	
	List<Doctor> getVerifiedDoctorsList();
	
	List<Doctor> getSuspendedDoctorsList();
	
	List<Doctor> getActiveDoctorsList();
}
