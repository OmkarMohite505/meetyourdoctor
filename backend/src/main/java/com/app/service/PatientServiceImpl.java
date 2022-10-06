package com.app.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.repository.PatientRepository;
import com.app.subdto.PatientAll;
import com.app.dto.PatientDTO;
import com.app.dto.UpdatePasswordDTO;
import com.app.entities.Patient;

@Service
@Transactional
public class PatientServiceImpl implements IPatientService {
	@Value("${file.profile.upload.location}")
	private String baseFolder;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PatientRepository patientRepository;
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public Patient registerPatient(Patient patient) {
		return patientRepository.save(patient);
	}

	@Override
	public String uploadProfilePicture(long patientId, MultipartFile imageFile) throws IOException {
		Patient patient = patientRepository.getReferenceById(patientId);
//		Clock clock = Clock.systemDefaultZone();
//		long milliSeconds=clock.millis();
//		String completePath = baseFolder + File.separator + patientId +milliSeconds + imageFile.getOriginalFilename();
//		System.out.println("complete path " + completePath);
//		System.out.println("Copied no of bytes "
//				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
//		// save complete path to the image in db
//		patient.setProfilePicture(completePath);
		patient.setProfileImgDB(imageFile.getBytes());
		return "Profile Picture uploaded";
	}

	@Override
	public byte[] restoreImage(long id) throws Exception {
		Patient persistentPatient = patientRepository.findById(id)
				.orElseThrow(() -> new Exception("Patient Not Found"));
		System.out.println(persistentPatient.getProfilePicture());
//		return Files.readAllBytes(Paths.get(persistentPatient.getProfilePicture()));
//		return Files.readAllBytes(Paths.get(imagePath));

		// new line added for to fetch from db
		return persistentPatient.getProfileImgDB();
	}

	@Override
	public byte[] restoreImageByPath(String imagePath) throws IOException {
		String completPath = baseFolder + File.separator + imagePath;
		return Files.readAllBytes(Paths.get(completPath));
	}

	@Override
	public PatientDTO getPatientDetails(String email) throws Exception {
		PatientDTO patientDTO = new PatientDTO();
		mapper.map(patientRepository.findByLoginEmail(email).orElseThrow(() -> new Exception("Patient Not Found")),
				patientDTO);
		return patientDTO;
	}

	@Override
	public List<PatientAll> getAllPatientList() {
		return patientRepository.findAll().stream().map(p -> mapper.map(p, PatientAll.class))
				.collect(Collectors.toList());
	}

	@Override
	public void updatePassword(UpdatePasswordDTO dto) {
		Patient patient = patientRepository.getReferenceById(dto.getId());
		patient.getLogin().setPassword(encoder.encode(dto.getNewPassword()));
	}

	@Override
	public void deletePatient(long patientId) {
		patientRepository.deleteById(patientId);
	}

}
