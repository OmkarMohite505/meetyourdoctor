package com.app.dto;

import java.util.Set;

import com.app.entities.Patient;

import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class SignUpRequest {
	private String userName;
	private String email;
	private String password;
	private Set<String> roles;
	private Patient patient;

}
