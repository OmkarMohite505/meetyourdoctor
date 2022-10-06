package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AppointmentDTO;
import com.app.entities.Appointment;
import com.app.subdto.AppointmentDoctorPatient;

public interface IAppointmentService {
	AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) throws Exception;
	
	String updateAppointment(AppointmentDTO appointmentDTO) throws Exception;
	
	List<String> uploadAppointmentPictures(Long appointmentId, Long patientId, MultipartFile[] imageFile) throws Exception;
	
	List<AppointmentDTO> getAllAppointmentListForPatient(long patientId)throws Exception;
	
	List<AppointmentDTO> getAllAppointmentListForDoctor(long doctorId)throws Exception;
	
	void updateAndCloseAppointmentByDoctor(AppointmentDTO appointmentDTO)throws Exception;
	
	List<AppointmentDoctorPatient> getAllOpenOppointmentListForPatient(long patientId)throws Exception;
	
	List<AppointmentDoctorPatient> getAllOpenOppointmentListForDoctor(long doctorId)throws Exception;
	
	List<AppointmentDoctorPatient> getAllClosedOppointmentListForPatient(long patientId)throws Exception;
	
	List<AppointmentDoctorPatient> getAllClosedOppointmentListForDoctor(long doctorId)throws Exception;
	
	void cancelAppointmentByPatient(long appointmentId, long patientId)throws Exception;
}
