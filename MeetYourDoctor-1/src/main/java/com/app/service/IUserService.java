package com.app.service;

import com.app.dto.AuthenticationRequest;
import com.app.dto.DoctorDTO;
import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.dto.UserResponseDTO;
import com.app.entities.Login;

//Nothing to do with spring security : it's job currently is user registration
public interface IUserService {
	UserResponseDTO registerPatient(SignUpRequest request, PatientDTO patient);
	
	UserResponseDTO registerDoctor(SignUpRequest request, DoctorDTO doctor);
	
	Login temporaryValidateUser(AuthenticationRequest request)throws Exception;
	
	
}
