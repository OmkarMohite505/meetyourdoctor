package com.app.service;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.AddressRepository;
import com.app.dao.DoctorRepository;
import com.app.dao.LoginRepository;
import com.app.dao.PatientRepository;
import com.app.dao.RoleRepository;
import com.app.dto.AuthenticationRequest;
import com.app.dto.DoctorDTO;
import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.dto.UserResponseDTO;
import com.app.entities.Role;
import com.app.entities.Address;
import com.app.entities.Doctor;
import com.app.entities.Login;
import com.app.entities.Patient;
import com.app.entities.UserRoles;

@Service
@Transactional
public class UserServiceImpl implements IUserService {
	@Autowired
	private LoginRepository loginRepo;
	@Autowired
	private RoleRepository roleRepo;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	ModelMapper mapper;
	@Autowired
	private PatientRepository patientRepository;
	@Autowired
	private DoctorRepository doctorRepository;
	@Autowired
	private AddressRepository addressRepository;

	@Override
	public UserResponseDTO registerPatient(SignUpRequest request, PatientDTO patientDTO) {
		// create User from request payload
		/*
		 * { "userName": "Rama", "email": "rama@gmail.com", "password": "ram#12345",
		 * "roles": [ "ROLE_ADMIN" ] }
		 */
		Login user = new Login();
		user.setUserName(request.getUserName());
		user.setEmail(request.getEmail());
		user.setPassword(encoder.encode(request.getPassword()));//set encoded pwd
		
		Set<Role> roles = request.getRoles().stream()//convert Set<String> : role names ---> Stream<String>
		//mapping roleName --> Role (using RoleRepo) 		
				.map(roleName -> roleRepo.findByUserRole(UserRoles.valueOf(roleName)).get())
				//collect in a Set<Role>
				.collect(Collectors.toSet());
		user.setRoles(roles);
		user.setActive(true);
		Login persistentUser = loginRepo.save(user);//persisted user details in db
		Patient patient = new Patient();
		mapper.map(patientDTO, patient);
		patient.setLogin(persistentUser);
		patientRepository.save(patient);
		UserResponseDTO dto = new UserResponseDTO();
		BeanUtils.copyProperties(persistentUser, dto);//for sending resp : copied User--->User resp DTO
		return dto;
	}
	
	@Override
	public UserResponseDTO registerDoctor(SignUpRequest request, DoctorDTO doctorDTO) {
		// create User from request payload
		/*
		 * { "userName": "Rama", "email": "rama@gmail.com", "password": "ram#12345",
		 * "roles": [ "ROLE_ADMIN" ] }
		 */
		Login user = new Login();
		user.setUserName(request.getUserName());
		user.setEmail(request.getEmail());
		user.setPassword(encoder.encode(request.getPassword()));//set encoded pwd
		
		Set<Role> roles = request.getRoles().stream()//convert Set<String> : role names ---> Stream<String>
		//mapping roleName --> Role (using RoleRepo) 		
				.map(roleName -> roleRepo.findByUserRole(UserRoles.valueOf(roleName)).get())
				//collect in a Set<Role>
				.collect(Collectors.toSet());
		user.setRoles(roles);
		user.setActive(true);
		
		Login persistentUser = loginRepo.save(user);//persisted user details in db
		
		Doctor doctor = new Doctor();
		mapper.map(doctorDTO, doctor);
		doctor.setLogin(persistentUser);
		
		Address address = new Address();
		mapper.map(doctorDTO.getAddress(), address);
		Address persistentAddress = addressRepository.save(address);
		doctor.setAddress(persistentAddress);
		
		doctorRepository.save(doctor);
		
		UserResponseDTO dto = new UserResponseDTO();
		BeanUtils.copyProperties(persistentUser, dto);//for sending resp : copied User--->User resp DTO
		return dto;
	}

	@Override
	public Login temporaryValidateUser(AuthenticationRequest request) throws Exception {
		return loginRepo.findbyEmail(request.getEmail()).orElseThrow(()->new Exception("User Not Found"));
//		return loginRepo.findByEmailAndPassword(request.getEmail(), encoder.encode(request.getPassword()))
//				.orElseThrow(()->new Exception("User Not Found"));
	}

	
	
		
	

}
