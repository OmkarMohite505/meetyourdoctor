package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthRequest;
import com.app.dto.AuthResp;
import com.app.dto.AuthRespDoctor;
import com.app.dto.AuthRespPatient;
import com.app.dto.DoctorDTO;
import com.app.dto.PatientDTO;
import com.app.dto.UpdatePasswordDTO;
import com.app.dto.UserDTO;
import com.app.jwt_utils.JwtUtils;
import com.app.service.UserService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/auth")
@Slf4j
@CrossOrigin
public class SignInSignUpController {
//dep : JWT utils : for generating JWT
	@Autowired
	private JwtUtils utils;
	// dep : Auth mgr
	@Autowired
	private AuthenticationManager manager;
	//dep : user service for handling users
	@Autowired
	private UserService userService;

	// add a method to authenticate user . In case of success --send back token , o.w
	// send back err mesg
	@PostMapping("/signin")
	public ResponseEntity<?> validateUserCreateToken(@RequestBody @Valid AuthRequest request) throws Exception {
		// store incoming user details(not yet validated) into Authentication object
		// Authentication i/f ---> implemented by UserNamePasswordAuthToken
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(request.getEmail(),
				request.getPassword());
		log.info("auth token before {}",authToken);
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			log.info("auth token again {} " , authenticatedDetails);
			// => auth succcess
			
			Object obj = userService.temporaryValidateUser(request.getEmail());
			if(obj instanceof PatientDTO) {
				PatientDTO patient = (PatientDTO)obj;
				patient.setJwt(utils.generateJwtToken(authenticatedDetails));
				patient.setMessage("Authentication Successfull");
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(patient);
			}
			if(obj instanceof DoctorDTO) {
				DoctorDTO doctor = (DoctorDTO)obj;
				doctor.setJwt(utils.generateJwtToken(authenticatedDetails));
				doctor.setMessage("Authentication Successfull");
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(doctor);
			}
			
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Your role not found");
			
			
			
		} catch (BadCredentialsException e) { // lab work : replace this by a method in global exc handler
			// send back err resp code
			System.out.println("err "+e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}

	}
	//add request handling method for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody @Valid UserDTO user)
	{
		System.out.println("in reg user : user "+user+" roles "+user.getRoles());//{....."roles" : [ROLE_USER,...]}
		//invoke service layer method , for saving : user info + associated roles info
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.registerUser(user));		
	}
	
	@PostMapping("/register_doctor")
	public ResponseEntity<?> registerPatient(@RequestBody DoctorDTO doctor){
		 userService.registerDoctor(doctor);
		return ResponseEntity.status(HttpStatus.CREATED).body("Registered Successfully");
	}
	
	@PostMapping("/register_patient")
	public ResponseEntity<?> registerPatient(@RequestBody PatientDTO patient) {
		userService.registerPatient(patient);
		return ResponseEntity.status(HttpStatus.CREATED).body("Registered Successfully");
	}
	
	@PostMapping("/send_otp")
	public ResponseEntity<?> sendOTP(@RequestBody UpdatePasswordDTO updatePasswordDTO) throws Exception{
		userService.sendOTPForForgotPassword(updatePasswordDTO.getEmail());
		return ResponseEntity.status(HttpStatus.OK).body("OTP sent to your email");
		
	}
	
	@PostMapping("/update_password")
	public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordDTO update) throws Exception{
		userService.updateUserPassword(update.getEmail(), update.getNewPassword(), update.getOtp());
		return ResponseEntity.status(HttpStatus.OK).body("Password Updated");
	}
}