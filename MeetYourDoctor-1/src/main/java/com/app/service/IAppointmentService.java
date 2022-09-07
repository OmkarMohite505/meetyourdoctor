package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.dto.AppointmentDTO;

public interface IAppointmentService {
	String createAppointment(AppointmentDTO appointmentDTO) throws Exception;
	
	String updateAppointment(AppointmentDTO appointmentDTO) throws Exception;
	
	List<String> uploadAppointmentPictures(Long appointmentId, Long patientId, MultipartFile[] imageFile) throws Exception;
}
