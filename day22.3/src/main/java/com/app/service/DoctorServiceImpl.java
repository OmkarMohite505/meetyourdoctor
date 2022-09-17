package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Clock;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.repository.DoctorRepository;
import com.app.dto.DoctorDTO;
import com.app.dto.DoctorDTOFilter;
import com.app.dto.DoctorFilter;
import com.app.entities.Doctor;
import com.app.entities.EducationalQualification;
import com.app.entities.Patient;
import com.app.entities.Speciality;
import com.app.enums.SpecialityType;

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
		long milliSeconds = clock.millis();
		String completePath = baseFolder + File.separator + doctorId + milliSeconds + imageFile.getOriginalFilename();
		System.out.println("complete path " + completePath);
		System.out.println("Copied no of bytes "
				+ Files.copy(imageFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
		// save complete path to the image in db
		doctor.setProfilePicture(completePath);
		return "Profile Picture uploaded";
	}

	@Override
	public byte[] restoreImage(long id) throws Exception {
		Doctor persistentDoctor = doctorRepository.findById(id).orElseThrow(() -> new Exception("Patient Not Found"));
		return Files.readAllBytes(Paths.get(persistentDoctor.getProfilePicture()));
//		return Files.readAllBytes(Paths.get(imagePath));
	}

	@Override
	public byte[] restoreImageByPath(String imagePath) throws IOException {
		String completePath = baseFolder + File.separator + imagePath;
		return Files.readAllBytes(Paths.get(completePath));
	}

	@Override
	public DoctorDTO getDoctorDetails(String email) throws Exception {
		DoctorDTO doctorDTO = new DoctorDTO();
		mapper.map(doctorRepository.findByLoginEmail(email).orElseThrow(() -> new Exception("Doctor not found")),
				doctorDTO);
		return doctorDTO;
	}

	@Override
	public List<Doctor> getAllDoctorsForPatient() {
		List<DoctorFilter> list = new ArrayList<>();

		List<Doctor> persistList = doctorRepository.findAll();

		List<Doctor> filteredList = persistList.stream()
				.filter(d -> d.isDoctorVerified() == true && d.isDoctorSuspended() == false)
//		.forEach(d-> System.out.println());
				.collect(Collectors.toList());
//		persistList.stream().filter(d->{
//			(d.isDoctorVerified() ==true && d.isDoctorSuspended == false);
//		});
//		persistList.forEach(d->{
//			DoctorFilter doctorFilter = new DoctorFilter();
//			mapper.map(persistList, doctorFilter);
//			list.add(doctorFilter);
//		});
		return filteredList;

	}

	@Override
	public List<Doctor> getAllDoctorsListForAdmin() {
//		List<DoctorDTO> list = new ArrayList<>();
		List<Doctor> persistList = doctorRepository.findAll();
//		persistList.forEach(d->{
//			list.add(mapper.map(persistList, DoctorDTO.class));
//		});
		return persistList;
	}

	@Override
	public void verifyDoctor(long doctorId) {
		Doctor persistDoctor = doctorRepository.findById(doctorId).orElseThrow();
		persistDoctor.setDoctorVerified(true);
	}

	@Override
	public void suspendDoctor(long doctorId) {
		Doctor persistDoctor = doctorRepository.findById(doctorId).orElseThrow();
		persistDoctor.setDoctorSuspended(true);
	}

	@Override
	public void unVerifyDoctor(long doctorId) {
		Doctor persistDoctor = doctorRepository.findById(doctorId).orElseThrow();
		persistDoctor.setDoctorVerified(false);

	}

	@Override
	public void removeDoctorSuspension(long doctorId) {
		Doctor persistDoctor = doctorRepository.findById(doctorId).orElseThrow();
		persistDoctor.setDoctorSuspended(false);
	}

	@Override
	public List<Doctor> getDoctorsListBySpeciality(SpecialityType speciality) {
		List<Doctor> list = doctorRepository.findAll();
//		List<Doctor> filteredList = 
//				list.stream()
//				.filter(d -> d.getSpeciality()
//						.forEach(s -> 
//						{if(s.getSpecialityType() == SpecialityType.valueOf(speciality.toUpperCase()))
//						return true;}))
//				.collect(Collectors.toList());
		Speciality spec = new Speciality();
		spec.setSpecialityType(speciality);

		List<Doctor> filteredList = list.stream().filter(d -> d.getSpeciality().contains(spec))
				.collect(Collectors.toList());

		return filteredList;
	}
	@Override
	public void updateSpecialityPhoto(long doctorId, String specialityType, MultipartFile specialityPic)
			throws IOException {
		Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
		if (specialityType.equals("empty")) {
			Clock clock = Clock.systemDefaultZone();
			long milliSeconds = clock.millis();
			String completePath = baseFolder + File.separator + doctorId + milliSeconds
					+ specialityPic.getOriginalFilename();
			System.out.println("complete path " + completePath);
			Files.copy(specialityPic.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING);

			doctor.getSpeciality().forEach(s -> s.setSpecialityPhoto(completePath));
		}
	}
	@Override
	public void updateEducatiionPhoto(long doctorId, MultipartFile[] educationPic) {
		Doctor doctor = doctorRepository.findById(doctorId).orElseThrow();
		
		List<String> eduPicPath = new ArrayList<>();
		List<String> fileNames = new ArrayList<>();
		try {

			Arrays.asList(educationPic).stream().forEach(file -> {

				Clock clock = Clock.systemDefaultZone();
				long milliSeconds = clock.millis();
				String completePath = baseFolder + File.separator + doctorId + milliSeconds
						+ file.getOriginalFilename();
				System.out.println("complete path " + completePath);
				try {
					 Files.copy(file.getInputStream(),
							Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING);
				} catch (IOException e) {
					e.printStackTrace();
				}
				eduPicPath.add(completePath);
				fileNames.add(file.getOriginalFilename());
			});

		} catch (Exception e) {
			e.printStackTrace();
		}
		int idx = 0;
		String[] arr = new String[eduPicPath.size()];
		for (String string : eduPicPath) {
			arr[idx++] = string;
		}
		int index = 0;
//		doctor.getQualification().forEach(q -> q.setCertificatePhoto(arr[index++]));
		Set<EducationalQualification> list = doctor.getQualification();
		for (EducationalQualification educationalQualification : list) {
			educationalQualification.setCertificatePhoto(arr[index++]);
		}
	}
	
	public void uploadSpecialityPhoto(long doctorId, MultipartFile specialityPhoto) {
		
	}

	@Override
	public List<Doctor> getUnVerifiedDoctorsList() {
		return doctorRepository.findAllByIsDoctorVerified(false);
	}

	@Override
	public List<Doctor> getVerifiedDoctorsList() {
		return doctorRepository.findAllByIsDoctorVerified(true);
	}

	@Override
	public List<Doctor> getSuspendedDoctorsList() {
		return doctorRepository.findAllByIsDoctorSuspended(true);
	}

	@Override
	public List<Doctor> getActiveDoctorsList() {
		return doctorRepository.findAllByIsDoctorSuspended(false);
	}

}
