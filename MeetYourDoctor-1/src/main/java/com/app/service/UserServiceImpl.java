package com.app.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.dao.AddressRepository;
import com.app.dao.DoctorRepository;
import com.app.dao.LoginRepository;
import com.app.dao.PatientAddressRepo;
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
import com.app.entities.PatientAddress;
import com.app.entities.UserRoles;


@Service
@Transactional
public class UserServiceImpl implements IUserService {
	@Autowired
	private JavaMailSender sender;
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
	@Autowired
	private PatientAddressRepo patientAddressRepo;
	

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
		
		
		  Set<PatientAddress> address = new HashSet<>(); 
		  List<PatientAddress> persistentAddress =
				  patientAddressRepo.saveAll(patientDTO.getAddress());
		  for (PatientAddress patientAddress : persistentAddress) {
			address.add(patientAddress);
		}
		  patient.setAddress(address);
		 
		
		
		
		
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
		
		 Set<Address> address = new HashSet<>();
		 List<Address> persistentAddress = addressRepository.saveAll(doctorDTO.getAddress());
		for (Address adr : persistentAddress) {
			
			address.add(adr);
		}
		doctor.setAddress(address);
		
		Doctor persistentDoctor = doctorRepository.save(doctor);
//		for (Address ad : persistentAddress) {
//			ad.setDoctor(persistentDoctor);
//		}
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

	@Override
	public void sendOTPForForgotPassword(String email) throws Exception {
		Login login = loginRepo.findbyEmail(email).orElseThrow(()-> new Exception("User Not Found"));
		
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(login.getEmail());
		mesg.setSubject("OTP for verification");
		Random ramdom = new Random();
		Integer otp =   ramdom.nextInt(999999);
//		StringBuilder otpString = new StringBuilder(otp);
//		if(otpString.length()!=6)
//			otpString.append(1);
		mesg.setText("Enter this OTP for verification : "+otp+"            Do not share it with anyone !!!!!");
		sender.send(mesg);
		login.setOtp(otp);
	}

	@Override
	public void updateUserPassword(String email, String newPassword, int otp) throws Exception {
		Login login = loginRepo.findByEmailAndOtp(email, otp).orElseThrow(()-> new Exception("User Not Found"));
		login.setPassword(encoder.encode(newPassword));
	}

	
	
		
	

}
