package com.app.service;

import javax.validation.Valid;

import com.app.dto.AdminDTO;
import com.app.dto.AuthenticationRequest;
import com.app.dto.DoctorDTO;
import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.dto.UserDTO;
import com.app.dto.UserRegResponse;
import com.app.dto.UserResponseDTO;
import com.app.entities.Login;

public interface UserService {

	UserRegResponse registerUser(UserDTO user);

	UserResponseDTO registerPatient(PatientDTO patient);

	UserResponseDTO registerDoctor(DoctorDTO doctor);

	<T> T temporaryValidateUser(String email) throws Exception;

	void sendOTPForForgotPassword(String email) throws Exception;

	void updateUserPassword(String email, String newPassword, int otp) throws Exception;
	
	AdminDTO getAdminDetails(String email);

}
