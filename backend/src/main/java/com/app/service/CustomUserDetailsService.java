package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.entities.Login;
import com.app.repository.LoginRepository;

import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Service // or @Component also works!
@Transactional
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {
	// dep : user repository : based upon spring data JPA
	@Autowired
	private LoginRepository LoginRepo;
//	@Autowired
//	PasswordEncoder encode;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		log.info("in Load by user name method  "+email);
		// invoke dao's method to load user details from db by username(ie. actaully an
		// email)
		Login user = LoginRepo.
				findByEmail(email).
				orElseThrow(() -> new UsernameNotFoundException("Invalid Email ID "));
		System.out.println("lifted user dtls from db "+user);
//		System.out.println(encode.matches("100", user.getPassword()));
		return new CustomUserDetails(user);
	}

}
