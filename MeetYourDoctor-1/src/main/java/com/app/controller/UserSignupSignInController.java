package com.app.controller;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthenticationRequest;
import com.app.dto.AuthenticationResponse;
import com.app.dto.DoctorDTO;
import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.entities.Login;
import com.app.entities.Patient;
import com.app.entities.Role;
import com.app.entities.UserRoles;
import com.app.jwt_utils.JwtUtils;
import com.app.service.IDoctorService;
import com.app.service.IPatientService;
import com.app.service.IUserService;

@RestController
@RequestMapping("/api")
@CrossOrigin //(origins = "http://localhost:4200")
public class UserSignupSignInController {

	// auto wire Authentication Manager for user authentication , created in
	// Security Config class
	// (currently based upon user details service)
	@Autowired
	private AuthenticationManager authManager;
	// auto wire JwtUtils for sending signed JWT back to the clnt
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private IUserService userService;
	@Autowired
	private IPatientService patientService;
	@Autowired 
	private IDoctorService doctorService;

	// add end point for user registration
	@PostMapping("/signup")
	public ResponseEntity<?> userRegistration(@RequestBody SignUpRequest request) {
		System.out.println("in user reg " + request);
//		return ResponseEntity.ok(userService.registerUser(request));
		return null;
	}
	

	// add end point for user authentication
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody AuthenticationRequest request) {
		System.out.println("in auth " + request);
		try {
			System.out.println("------------------");
			System.out.println("-------- Email : "+request.getEmail()+"     "+request.getPassword());
			// Tries to authenticate the passed Authentication object, returning a fully
			// populated Authentication object (including granted authorities)if successful.
			Authentication authenticate = authManager.authenticate
			// An o.s.s.c.Authentication i/f implementation used for simple presentation of
			// a username and password.
			// Actual dao based authentication takes place here internally(first email : here replaced username by email for authentication
					
			// n then pwd n then authorities gets validated)
			(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			// => successful authentication : create JWT n send it to the clnt in the
			// response.
			System.out.println("auth success " + authenticate);
			return ResponseEntity.ok(new AuthenticationResponse(jwtUtils.generateJwtToken(authenticate)));
		} catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("User authentication Failed", e);
		}

	}
	
	@PostMapping("/signwo")
	public ResponseEntity<?> ValidateUser(@RequestBody AuthenticationRequest request) throws Exception{
		Login validatedUser = userService.temporaryValidateUser(request);
		System.out.println(validatedUser.getRoles());
		Set<Role> roles = validatedUser.getRoles();
		Role role = new Role();
		role.setId((long)2);
		role.setUserRole(UserRoles.valueOf("ROLE_PATIENT"));
		Role role1 = new Role();
		role1.setId((long)3);
		role1.setUserRole(UserRoles.valueOf("ROLE_DOCTOR"));
		if(roles.contains(role)) {
			PatientDTO patientDTO = patientService.getPatientDetails(validatedUser.getEmail());
			Set<String> userRoles  = new HashSet<>();
			userRoles.add("ROLE_PATIENT");
			patientDTO.setRoles(userRoles);
			patientDTO.setLoginId(validatedUser.getId());
			return ResponseEntity.status(HttpStatus.OK).body(patientDTO);
		}
			
		if(roles.contains(role1)) {
			DoctorDTO doctorDTO = doctorService.getDoctorDetails(validatedUser.getEmail());
			Set<String> userRoles  = new HashSet<>();
			userRoles.add("ROLE_DOCTOR");
			doctorDTO.setRoles(userRoles);
			doctorDTO.setLoginId(validatedUser.getId());
			return ResponseEntity.status(HttpStatus.OK).body(doctorDTO);
		}
			
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Enter Correct Details");
	}
	
	
	

}
