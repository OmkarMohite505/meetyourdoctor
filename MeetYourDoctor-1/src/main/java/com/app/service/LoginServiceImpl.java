package com.app.service;

import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.LoginRepository;
import com.app.dao.RoleRepository;
import com.app.dto.UserResponseDTO;
import com.app.entities.Login;
import com.app.entities.Role;
import com.app.entities.UserRoles;

@Service
@Transactional
public class LoginServiceImpl implements ILoginService {
	@Autowired
	private LoginRepository loginRepository;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private RoleRepository roleRepo;

	@Override
	public Login registerUserForLogin(Login login) {
		login.setPassword(encoder.encode("omkar"));
		return loginRepository.save(login); 
	}

}
