package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.repository.DoctorRepository;
import com.app.dto.DoctorDTO;
import com.app.entities.Doctor;
import com.app.entities.Patient;

@Service
@Transactional
public class DoctorServiceImpl implements IDoctorService {
	@Value("${file.profile.upload.location}")
	private String baseFolder;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private DoctorRepository doctorRepository;

	@Override
	public String uploadProfilePicture(long doctorId, MultipartFile imageFile) throws IOException {
		Doctor doctor = doctorRepository.getById(doctorId);
		Clock clock = Clock.systemDefaultZone();
		long milliSeconds=clock.millis();
		String completePath = baseFolder + File.separator + doctorId + milliSeconds
				+ imageFile.getOriginalFilename();
		System.out.println("complete path " + completePath);
		System.out.println("Copied no of bytes "
				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
		// save complete path to the image in db
		doctor.setProfilePicture(completePath);
		return "Profile Picture uploaded";
	}
	
	@Override
	public byte[] restoreImage(long id) throws Exception {
		Doctor persistentDoctor = doctorRepository.findById(id).orElseThrow(()->new Exception("Patient Not Found"));
		return Files.readAllBytes(Paths.get(persistentDoctor.getProfilePicture()));
//		return Files.readAllBytes(Paths.get(imagePath));
	}

	@Override
	public DoctorDTO getDoctorDetails(String email) throws Exception {
		DoctorDTO doctorDTO = new DoctorDTO();
		mapper.map(doctorRepository.findByLoginEmail(email).orElseThrow(()->new Exception("Doctor not found")), doctorDTO);
		return doctorDTO;
	}

	@Override
	public List<Doctor> getAllDoctors() {
		return doctorRepository.findAll();
	}
}
