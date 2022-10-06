package com.app.service;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.repository.AddressRepository;
import com.app.repository.BankRepository;
import com.app.repository.DoctorRepository;
import com.app.repository.DoctorTimetableRepo;
import com.app.repository.PatientAddressRepo;
import com.app.repository.PatientRepository;
import com.app.dto.AdminDTO;
import com.app.dto.AuthenticationRequest;
import com.app.dto.DoctorDTO;
import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.dto.UserDTO;
import com.app.dto.UserRegResponse;
import com.app.dto.UserResponseDTO;
import com.app.entities.Address;
import com.app.entities.BankAccount;
import com.app.entities.Doctor;
import com.app.entities.DoctorTimeTable;
import com.app.entities.Login;
import com.app.entities.OTP;
import com.app.entities.Patient;
import com.app.entities.PatientAddress;
import com.app.entities.RoleEntity;
import com.app.enums.RoleEnum;
import com.app.repository.LoginRepository;
import com.app.repository.OtpRepository;
import com.app.repository.RoleRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Value("${file.profile.upload.location}")
	private String baseFolder;
	@Autowired
	private JavaMailSender sender;
	@Autowired
	private static JavaMailSender mailSender;
	// dep : user repo n role repo
	@Autowired
	private LoginRepository loginRepo;

	@Autowired
	private RoleRepository roleRepo;

	// mapper
	@Autowired
	private ModelMapper mapper;
	// password enc
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private AddressRepository addressRepository;
	@Autowired
	private PatientAddressRepo patientAddressRepo;
	@Autowired
	private IPatientService patientService;
	@Autowired
	private IDoctorService doctorService;
	@Autowired
	private BankRepository bankRepository;
	@Autowired
	private DoctorTimetableRepo doctorTimetableRepo;
	@Autowired
	private OtpRepository otpRepository;

	@Override
	public UserRegResponse registerUser(UserDTO user) {
		// Objective : 1 rec inserted in users table n insert n recs in link table
		// user_roles
		// 1. Map dto --> entity
		Login userEntity = mapper.map(user, Login.class);
		// 2. Map Set<UserRole : enum> ---> Set<Role :entity> n assign it to the
		// transient user entity
		userEntity.setUserRoles(roleRepo.findByRoleNameIn(user.getRoles()));
		// 3. encode pwd
		userEntity.setPassword(encoder.encode(user.getPassword()));
		// 4 : Save user details
		Login persistentUser = loginRepo.save(userEntity);
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(persistentUser.getEmail());
		mesg.setSubject("Congratulations you are registered successfully ");
		mesg.setText("Hello Admin"
				+ ",\nYou are successfully registered !!!!!\n\nRegards,\nMeet Your Doctor Team");
		sender.send(mesg);
		return new UserRegResponse("User registered successfully with ID " + persistentUser.getId());
	}

	@Override
	public UserResponseDTO registerPatient(PatientDTO patientDTO) {
		Login userEntity = new Login();

		userEntity.setUserRoles(roleRepo.findByRoleNameIn(patientDTO.getRoles()));

		userEntity.setEmail(patientDTO.getEmail());
		userEntity.setPassword(encoder.encode(patientDTO.getPassword()));// set encoded pwd

		Login persistentUser = loginRepo.save(userEntity);// persisted user details in db
		Patient patient = new Patient();
		mapper.map(patientDTO, patient);
		patient.setLogin(persistentUser);

		String defaultProfile = baseFolder + File.separator + "default.jpg";
		patient.setProfilePicture(defaultProfile);
		Patient persistentPatient = patientRepository.save(patient);
		UserResponseDTO dto = new UserResponseDTO();
		dto.setId(persistentPatient.getPatientId());
//		sendRegistrationEmailToPatient(persistentPatient.getEmail(), persistentPatient.getFirstName());
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(persistentPatient.getEmail());
		mesg.setSubject("Congratulations you are registered successfully ");
		mesg.setText("Hello " + persistentPatient.getFirstName()
				+ ",\nYou are successfully registered !!!!!\n\nRegards,\nMeet Your Doctor Team");
		sender.send(mesg);
		return dto;
	}

	@Override
	public UserResponseDTO registerDoctor(DoctorDTO doctorDTO) {
		Login userEntity = new Login();

		userEntity.setUserRoles(roleRepo.findByRoleNameIn(doctorDTO.getRoles()));

		userEntity.setEmail(doctorDTO.getEmail());
		userEntity.setPassword(encoder.encode(doctorDTO.getPassword()));// set encoded pwd

		Login persistentUser = loginRepo.save(userEntity);// persisted user details in db : parent rec

		// map dto --> doc entity
		Doctor doctor = mapper.map(doctorDTO, Doctor.class);
		// establish uni dir asso doc --> login
		doctor.setLogin(persistentUser);
		// create profile url n assign it to a doc
		String defaultProfile = baseFolder + File.separator + "default.jpg";
		doctor.setProfilePicture(defaultProfile);
		// since all rpimary details of doc is set , save the entity (parent rec saved)
		Doctor persistentDoctor = doctorRepository.save(doctor);// ins in doc tbl
		// get acct details from dto
		BankAccount account = doctorDTO.getBankAccount();
		// establish uni dir asso acct --> doc
		account.setDoctor(persistentDoctor);
		// save child rec of acc with fk set
		bankRepository.save(account);// ins in acct tbl with FK

		UserResponseDTO dto = new UserResponseDTO();
		dto.setId(persistentDoctor.getDoctorId());
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(persistentDoctor.getEmail());
		mesg.setSubject("Congratulations you are registered successfully ");
		mesg.setText("Hello " + persistentDoctor.getFirstName()
				+ ",\n You are successfully registered !!!!!\n\nRegards,\nMeet Your Doctor Team");
		sender.send(mesg);
		return dto;
	}

	@Override
	public <T> T temporaryValidateUser(String email) throws Exception {
		Login validatedUser = loginRepo.findByEmail(email).orElseThrow(() -> new Exception("User Not Found"));
//		return loginRepo.findByEmailAndPassword(request.getEmail(), encoder.encode(request.getPassword()))
//				.orElseThrow(()->new Exception("User Not Found"));
		Set<RoleEntity> roles = validatedUser.getUserRoles();
		RoleEntity patient = new RoleEntity();
		patient.setId((long) 2);
		patient.setRoleName(RoleEnum.valueOf("ROLE_PATIENT"));
		RoleEntity doctor = new RoleEntity();
		doctor.setId((long) 3);
		doctor.setRoleName(RoleEnum.valueOf("ROLE_DOCTOR"));
		RoleEntity admin = new RoleEntity();
		admin.setId((long) 1);
		admin.setRoleName(RoleEnum.valueOf("ROLE_ADMIN"));
		if (roles.contains(patient)) {
			Set<RoleEnum> loginRole = new HashSet<>();
			loginRole.add(RoleEnum.valueOf("ROLE_PATIENT"));
			PatientDTO dto = patientService.getPatientDetails(validatedUser.getEmail());
			dto.setRoles(loginRole);
			return (T) dto;
		}

		if (roles.contains(doctor)) {
			Set<RoleEnum> loginRole = new HashSet<>();
			loginRole.add(RoleEnum.valueOf("ROLE_DOCTOR"));
			DoctorDTO dto = doctorService.getDoctorDetails(validatedUser.getEmail());
			dto.setRoles(loginRole);
			return (T) dto;
		}
		if (roles.contains(admin)) {
			return (T) mapper.map(validatedUser, AdminDTO.class);
		}

		return null;

	}

	@Override
	public void sendOTPForForgotPassword(String email) throws Exception {
		Login login = loginRepo.findByEmail(email).orElseThrow(() -> new Exception("Wrong Email Id you Provided"));

		Random ramdom = new Random();
		Integer otp = ramdom.nextInt(999999);

		OTP otpTran = new OTP();
		otpTran.setEmail(login.getEmail());
		otpTran.setOtp(otp);
		otpTran.setDateCreated(LocalDateTime.now());
		otpRepository.save(otpTran);
//		StringBuilder otpString = new StringBuilder(otp);
//		if(otpString.length()!=6)
//			otpString.append(1);
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(login.getEmail());
		mesg.setSubject("OTP for verification");
		mesg.setText("Enter this OTP for verification : " + otp + "            Do not share it with anyone !!!!!");
		sender.send(mesg);

//		login.setOtp(otp);
	}

	@Override
	public void updateUserPassword(String email, String newPassword, int otp) throws Exception {
//		Login login = loginRepo.findByEmailAndOtp(email, otp).orElseThrow(() -> new Exception("User Not Found"));

		LocalDateTime now = LocalDateTime.now();
		OTP persistOTP = otpRepository.findByEmailAndOtp(email, otp);
		if (!now.isBefore(persistOTP.getDateCreated().plusMinutes(10)))
			throw new Exception("OTP expired, genrate new OTP");
		Login login = loginRepo.findByEmail(email).orElseThrow();
		login.setPassword(encoder.encode(newPassword));
		otpRepository.delete(persistOTP);
		
	}

	@Override
	public AdminDTO getAdminDetails(String email) {
		Login login = loginRepo.findByEmail(email).orElseThrow();
		return mapper.map(login, AdminDTO.class);

	}

	public static void sendRegistrationEmailToPatient(String email, String name) {
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(email);
		mesg.setSubject("Congratulations you are registered successfully ");
		mesg.setText("Hello " + name + ",\n You are successfully registered !!!!!\n\nRegards,\nMeet Your Doctor Team");
		mailSender.send(mesg);
	}

}
