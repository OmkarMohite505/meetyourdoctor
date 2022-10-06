package com.app.dto;

import java.util.Set;

import com.app.enums.RoleEnum;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminDTO {
	public Long id;
	public String email;
	private Set<RoleEnum> roles;
	private String message;

	private String jwt;
}
