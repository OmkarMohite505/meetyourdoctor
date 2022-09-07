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
import java.util.Optional;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.PatientRepository;
import com.app.dto.PatientDTO;
import com.app.entities.Patient;

@Service
@Transactional
public class PatientServiceImpl implements IPatientService {
	@Value("${file.upload.location}")
	private String baseFolder;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private PatientRepository patientRepository;

	@Override
	public Patient registerPatient(Patient patient) {
		return patientRepository.save(patient);
	}

	@Override
	public String uploadProfilePicture(long patientId, MultipartFile imageFile) throws IOException {
		Patient patient = patientRepository.getById(patientId);
		Clock clock = Clock.systemDefaultZone();
		long milliSeconds=clock.millis();
		String completePath = baseFolder + File.separator + patientId +milliSeconds + imageFile.getOriginalFilename();
		System.out.println("complete path " + completePath);
		System.out.println("Copied no of bytes "
				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
		// save complete path to the image in db
		patient.setProfilePicture(completePath);
		return "Profile Picture uploaded";
	}

	@Override
	public byte[] restoreImage(String imagePath) throws Exception {
//		Patient persistentPatient = patientRepository.findById(loginId).orElseThrow(()->new Exception("Patient Not Found"));
//		return Files.readAllBytes(Paths.get(persistentPatient.getProfilePicture()));
		return Files.readAllBytes(Paths.get(imagePath));
	}

	@Override
	public PatientDTO getPatientDetails(String email) throws Exception {
		PatientDTO patientDTO = new PatientDTO();
		mapper.map(patientRepository.findByLoginEmail(email).orElseThrow(()->new Exception("Patient Not Found")), patientDTO);
		return patientDTO;
	}

}
