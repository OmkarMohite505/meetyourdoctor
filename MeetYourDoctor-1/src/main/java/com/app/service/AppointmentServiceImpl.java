package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Clock;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.AppointmentRepository;
import com.app.dao.DoctorRepository;
import com.app.dao.PatientRepository;
import com.app.dto.AppointmentDTO;
import com.app.entities.Appointment;
import com.app.entities.Doctor;
import com.app.entities.Patient;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Service
@Transactional // optional
public class AppointmentServiceImpl implements IAppointmentService {
	@Value("${file.upload.location}")
	private String baseFolder;

	@Value("${Twilio.ACCOUNT_SID}")
	private static String ACCOUNT_SID;

	@Value("${Twilio.AUTH_TOKEN}")
	private static String AUTH_TOKEN;

	@Value("${Twilio.MY_NUMBER}")
	private static String MY_NUMBER;
	
	@Autowired
	private static JavaMailSender sender;
	@Autowired
	private AppointmentRepository appointmentRepository;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private DoctorRepository doctorRepository;
	@Autowired
	private PatientRepository patientRepository;

	@Override
	public String createAppointment(AppointmentDTO appointmentDTO) throws Exception {
		Appointment appointment = new Appointment();
		mapper.map(appointmentDTO, appointment);

		Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctorId())
				.orElseThrow(() -> new Exception("Doctor Not Found"));

		Patient patient = patientRepository.findById(appointmentDTO.getPatientId())
				.orElseThrow(() -> new Exception("Patient not found"));

		appointment.setDoctor(doctor);
		appointment.setPatient(patient);
		appointment.setStatus("OPEN");
		appointmentRepository.save(appointment);
		sendAppointmentBookMailAndSMS(patient, doctor, appointment);
		return "Created";
	}

	@Override
	public String updateAppointment(AppointmentDTO appointmentDTO) throws Exception {
		Appointment appointment = new Appointment();
		mapper.map(appointmentDTO, appointment);
		Appointment appointmentPersist = appointmentRepository.findById(appointmentDTO.getAppointmentId())
				.orElseThrow(() -> new Exception("Appointment Detials Not found"));

		Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctorId())
				.orElseThrow(() -> new Exception("Doctor Not Found"));

		Patient patient = patientRepository.findById(appointmentDTO.getPatientId())
				.orElseThrow(() -> new Exception("Patient not found"));

		if (appointmentPersist.getDoctor().getDoctor_id() == doctor.getDoctor_id()
				&& appointmentPersist.getPatient().getId() == patient.getId()) {

			Appointment appt = appointmentRepository.getById(appointmentPersist.getAppointmentId());
			appt.setAppointmentDescription(appointmentDTO.getAppointmentDescription());
			appt.setStatus(appointmentDTO.getStatus());
			sendUpdatedAppointmentBookMailAndSMS(patient, doctor, appointmentPersist);
			return "Appointment Record Updated";
			
		} else {
			return "Wrong details you have shared";
		}

	}

	@Override
	public List<String> uploadAppointmentPictures(Long appointmentId, Long patientId, MultipartFile[] imageFiles)
			throws Exception {
		Appointment appointment = appointmentRepository.getById(appointmentId);
		Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new Exception("Patient Not Found"));

		if (appointment.getPatient().getId() != patientId)
			throw new Exception("Please Provide correct details");
		List<String> appointmentImages = new ArrayList<>();
		List<String> fileNames = new ArrayList<>();
		try {

			Arrays.asList(imageFiles).stream().forEach(file -> {

				Clock clock = Clock.systemDefaultZone();
				long milliSeconds = clock.millis();
				String completePath = baseFolder + File.separator + patientId + appointmentId + milliSeconds
						+ file.getOriginalFilename();
				System.out.println("complete path " + completePath);
				try {
					System.out.println("Copied no of bytes " + Files.copy(file.getInputStream(),
							Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING));
				} catch (IOException e) {
					e.printStackTrace();
				}
				appointmentImages.add(completePath);
				fileNames.add(file.getOriginalFilename());
			});

		} catch (Exception e) {
			e.printStackTrace();
		}
		appointment.setAppointmentImage(appointmentImages);
		return fileNames;

	}

	public static boolean sendAppointmentBookMailAndSMS(Patient patient, Doctor doctor, Appointment appointment) {
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(patient.getEmail());
		mesg.setSubject("Your Appointment Booked Successfully");
		mesg.setText("Dear " + patient.getFirstName() + ",\nYour Appointment Booked Successfully with "
				+ doctor.getFirstName());
		sender.send(mesg);
		
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

	    Message message = Message.creator(new PhoneNumber(MY_NUMBER),
	        new PhoneNumber("+917620608558"),  
	        "Hello "+patient.getFirstName()+", Your Appointment Booked Successfully \nAppointment Id: "+appointment.getAppointmentId()).create();

	    System.out.println(message.getSid());
		return true;
	}
	
	public static boolean sendUpdatedAppointmentBookMailAndSMS(Patient patient, Doctor doctor, Appointment appointment) {
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(patient.getEmail());
		mesg.setSubject("Your Appointment Bookking Details Updated Successfully");
		mesg.setText("Dear " + patient.getFirstName() + ",\nYour Appointment Bookking Details Updated Successfully with "
				+ doctor.getFirstName());
		sender.send(mesg);
		
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

	    Message message = Message.creator(new PhoneNumber(MY_NUMBER),
	        new PhoneNumber("+917620608558"),  
	        "Hello "+patient.getFirstName()+", Your Appointment Bookking Details Updated Successfully \nAppointment Id: "+appointment.getAppointmentId()).create();

	    System.out.println(message.getSid());
		return true;
	}

}
