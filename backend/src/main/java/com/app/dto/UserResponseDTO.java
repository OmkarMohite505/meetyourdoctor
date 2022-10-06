package com.app.dto;

import java.util.HashSet;
import java.util.Set;

import com.app.entities.RoleEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {

	private Long id;
	
	private String userName;
	
	private String email;
	
	
	private boolean active;
	
	
	
	private Set<RoleEntity> roles = new HashSet<>();

	
	
}
