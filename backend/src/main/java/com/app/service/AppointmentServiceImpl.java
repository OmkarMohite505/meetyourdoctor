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
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.repository.AppointmentRepository;
import com.app.repository.DoctorRepository;
import com.app.repository.PatientRepository;
import com.app.subdto.AppointmentDoctorPatient;
import com.app.dto.AppointmentDTO;
import com.app.entities.Appointment;
import com.app.entities.Doctor;
import com.app.entities.Patient;
import com.app.enums.AppointmentStatusEnum;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional // optional
@Slf4j
public class AppointmentServiceImpl implements IAppointmentService {
	@Value("${file.appointment.upload.location}")
	private String baseFolder;

	@Value("${Twilio.ACCOUNT_SID}")
	private static String ACCOUNT_SID;

	@Value("${Twilio.AUTH_TOKEN}")
	private static String AUTH_TOKEN;

	@Value("${Twilio.MY_NUMBER}")
	private static String MY_NUMBER;

	@Autowired
	private JavaMailSender sender;
	@Autowired
	private AppointmentRepository appointmentRepository;
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private DoctorRepository doctorRepository;
	@Autowired
	private PatientRepository patientRepository;

	@Override
	public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) throws Exception {
		Appointment appointment = new Appointment();
		mapper.map(appointmentDTO, appointment);

		Doctor doctor = doctorRepository.findById(appointmentDTO.getDoctorId())
				.orElseThrow(() -> new Exception("Doctor Not Found"));

		Patient patient = patientRepository.findById(appointmentDTO.getPatientId())
				.orElseThrow(() -> new Exception("Patient not found"));

		appointment.setDoctor(doctor);
		appointment.setPatient(patient);
		appointment.setStatus(AppointmentStatusEnum.valueOf("OPEN"));
		Appointment persistentAppointment = appointmentRepository.save(appointment);
//		sendAppointmentBookMailAndSMS(patient, doctor, appointment);
		mapper.map(persistentAppointment, appointmentDTO);
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(patient.getEmail());
		mesg.setSubject("Your Appointment Booked Successfully");
		mesg.setText("Dear " + patient.getFirstName() + ",\nYour Appointment Booked Successfully with ");
		sender.send(mesg);
		SimpleMailMessage mesg1 = new SimpleMailMessage();
		mesg1.setTo(doctor.getEmail());
		mesg1.setSubject("Your Appointment Booked Successfully");
		mesg1.setText("Dear " + doctor.getFirstName() + ",\n"+patient.getFirstName()+" has Booked Appointment  with you \n\nRegrds,\nMeey Your Doctor team");
		sender.send(mesg1);

//		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
//
//		Message message = Message
//				.creator(new PhoneNumber(MY_NUMBER), new PhoneNumber("+917620608558"), "Hello " + patient.getFirstName()
//						+ ", Your Appointment Booked Successfully \nAppointment Id: " + appointment.getAppointmentId())
//				.create();
//
//		System.out.println(message.getSid());
		return appointmentDTO;
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

		if (appointmentPersist.getDoctor().getId() == doctor.getId()
				&& appointmentPersist.getPatient().getId() == patient.getId()) {

			Appointment appt = appointmentRepository.getReferenceById(appointmentPersist.getAppointmentId());
			appt.setAppointmentDescription(appointmentDTO.getAppointmentDescription());
			appt.setStatus(appointmentDTO.getStatus());
//			sendUpdatedAppointmentBookMailAndSMS(patient, doctor, appointmentPersist);
			return "Appointment Record Updated";

		} else {
			return "Wrong details you have shared";
		}

	}

	@Override
	public List<String> uploadAppointmentPictures(Long appointmentId, Long patientId, MultipartFile[] imageFiles)
			throws Exception {
		Appointment appointment = appointmentRepository.getReferenceById(appointmentId);
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
				// extra line added
				appointment.getAppointmentImage().add(completePath);
				fileNames.add(file.getOriginalFilename());
			});

		} catch (Exception e) {
			e.printStackTrace();
		}
//		appointment.setAppointmentImage(appointmentImages);
		return fileNames;

	}

	public static boolean sendAppointmentBookMailAndSMS(Patient patient, Doctor doctor, Appointment appointment) {
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(patient.getEmail());
		mesg.setSubject("Your Appointment Booked Successfully");
		mesg.setText("Dear " + patient.getFirstName() + ",\nYour Appointment Booked Successfully with "
				+ doctor.getFirstName());
//		sender.send(mesg);

		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

		Message message = Message
				.creator(new PhoneNumber(MY_NUMBER), new PhoneNumber("+917620608558"), "Hello " + patient.getFirstName()
						+ ", Your Appointment Booked Successfully \nAppointment Id: " + appointment.getAppointmentId())
				.create();

		System.out.println(message.getSid());
		return true;
	}

	public static boolean sendUpdatedAppointmentBookMailAndSMS(Patient patient, Doctor doctor,
			Appointment appointment) {
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(patient.getEmail());
		mesg.setSubject("Your Appointment Bookking Details Updated Successfully");
		mesg.setText("Dear " + patient.getFirstName()
				+ ",\nYour Appointment Bookking Details Updated Successfully with " + doctor.getFirstName());
//		sender.send(mesg);

		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

		Message message = Message.creator(new PhoneNumber(MY_NUMBER), new PhoneNumber("+917620608558"),
				"Hello " + patient.getFirstName()
						+ ", Your Appointment Bookking Details Updated Successfully \nAppointment Id: "
						+ appointment.getAppointmentId())
				.create();

//		System.out.println(message.getSid());
		return true;
	}

	public static void sendClosedAppointmentEmailAndSMS(Appointment appointment) {
		SimpleMailMessage mesg = new SimpleMailMessage();
		mesg.setTo(appointment.getPatient().getEmail());
		mesg.setSubject("Your Appointment Bookking Details Updated Successfully");
		var doctorName = appointment.getDoctor().getFirstName();
		mesg.setText("Dear " + appointment.getPatient().getFirstName() + ",\nYour Appointment Closed By Doctor. "
				+ doctorName + "\nFor more information log on to www.meetyourdoctor.co.in"
				+ "\nRegards,\nMeet You Doctor Services");

//		sender.send(mesg);

		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

		Message message = Message
				.creator(new PhoneNumber(MY_NUMBER), new PhoneNumber("+917620608558"),
						"Hello " + appointment.getPatient().getFirstName()
								+ ", Your Appointment Closed \nAppointment Id: " + appointment.getAppointmentId())
				.create();
	}

	@Override
	public List<AppointmentDTO> getAllAppointmentListForPatient(long patientId) throws Exception {
		Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new Exception("Patient Not Found"));
		List<Appointment> list = appointmentRepository.findByPatient(patient);
		List<AppointmentDTO> temp = new ArrayList<>();
//		 list.stream().forEach(a -> mapper.map(a, temp.add(a)));
		mapper.map(list, temp);
		for (Appointment appt : list) {
			AppointmentDTO dto = new AppointmentDTO();
			mapper.map(appt, dto);
			dto.setDoctorId(appt.getDoctor().getId());
			dto.setPatientId(patientId);
//			dto.setPaymentStatus(appt.getPayment().getStatus());
			dto.setDoctorName(appt.getDoctor().getFirstName());
			temp.add(dto);
		}
		return temp;
	}

	@Override
	public List<AppointmentDTO> getAllAppointmentListForDoctor(long doctorId) throws Exception {
		Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new Exception("Doctor Not Found"));
		List<Appointment> list = appointmentRepository.findByDoctor(doctor);
		List<AppointmentDTO> temp = new ArrayList<>();
		mapper.map(list, temp);
		for (Appointment appt : list) {
			AppointmentDTO dto = new AppointmentDTO();
			mapper.map(appt, dto);
			dto.setPatientId(appt.getPatient().getId());
			dto.setPatientName(appt.getPatient().getFirstName());
//			dto.setPaymentStatus(appt.getPayment().getStatus());
			dto.setDoctorName(appt.getDoctor().getFirstName());
			temp.add(dto);
		}
		return temp;
	}

	@Override
	public void updateAndCloseAppointmentByDoctor(AppointmentDTO appointmentDTO) throws Exception {
		Appointment persistAppointment = appointmentRepository.getReferenceById(appointmentDTO.getAppointmentId());
		if (appointmentDTO.getAppointmentId() != persistAppointment.getAppointmentId()
				&& appointmentDTO.getPatientId() != persistAppointment.getPatient().getId())
			throw new Exception("Please Provide correct details");
		persistAppointment.setStatus(appointmentDTO.getStatus());
		persistAppointment.setAppointmentDescription(appointmentDTO.getAppointmentDescription());
//		sendClosedAppointmentEmailAndSMS(persistAppointment);
		log.info("Appointment Closed");
	}

	@Override
	public List<AppointmentDoctorPatient> getAllOpenOppointmentListForPatient(long patientId) throws Exception {
		Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new Exception("Patient Not Found"));
		List<Appointment> list = appointmentRepository.findByPatient(patient);
		return list.stream().filter(a -> a.getStatus() == AppointmentStatusEnum.valueOf("OPEN"))
				.map(a -> mapper.map(a, AppointmentDoctorPatient.class))
				.collect(Collectors.toList());

	}

	@Override
	public List<AppointmentDoctorPatient> getAllOpenOppointmentListForDoctor(long doctorId) throws Exception {
		Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new Exception("Doctor Not Found"));
		List<Appointment> list = appointmentRepository.findByDoctor(doctor);
		return list.stream().filter(a -> a.getStatus() == AppointmentStatusEnum.valueOf("OPEN"))
				.map(a -> mapper.map(a, AppointmentDoctorPatient.class))
				.collect(Collectors.toList());
	}

	@Override
	public List<AppointmentDoctorPatient> getAllClosedOppointmentListForPatient(long patientId) throws Exception {
		Patient patient = patientRepository.findById(patientId).orElseThrow(() -> new Exception("Patient Not Found"));
		List<Appointment> list = appointmentRepository.findByPatient(patient);
		return list.stream().filter(a -> a.getStatus() == AppointmentStatusEnum.valueOf("CLOSED"))
				.map(a -> mapper.map(a, AppointmentDoctorPatient.class))
				.collect(Collectors.toList());
//		List<Appointment> list = appointmentRepository.getAllAppointmentListByStatusForPatient("CLOSED", patientId);
//		return list.stream().map(a -> mapper.map(list, AppointmentDTO.class))
//				.collect(Collectors.toList());
	}

	@Override
	public List<AppointmentDoctorPatient> getAllClosedOppointmentListForDoctor(long doctorId) throws Exception {
		Doctor doctor = doctorRepository.findById(doctorId).orElseThrow(() -> new Exception("Doctor Not Found"));
		List<Appointment> list = appointmentRepository.findByDoctor(doctor);
		return list.stream().filter(a -> a.getStatus() == AppointmentStatusEnum.valueOf("CLOSED"))
				.map(a -> mapper.map(a, AppointmentDoctorPatient.class))
				.collect(Collectors.toList());
	}

	@Override
	public void cancelAppointmentByPatient(long appointmentId, long patientId) throws Exception {
		Appointment appointmemnt = appointmentRepository.findById(appointmentId).orElseThrow(()->new Exception("Appoinntmment details not found"));
		if(appointmemnt.getPatient().getId() != patientId)
			throw new Exception("Wrong details you provided");
		appointmentRepository.deleteById(appointmentId);
	}

}
