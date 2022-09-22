package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordDTO {
	private String email;
	private String newPassword;
	private String oldPassword;
	private int otp;
	private Long id;

}
