package com.app.controller;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.DoctorDTO;
import com.app.dto.DoctorTimeTableDTO;
import com.app.dto.Image;
import com.app.dto.PatientDTO;
import com.app.dto.SignUpRequest;
import com.app.dto.TimeTableDTO;
import com.app.dto.UpdatePasswordDTO;
import com.app.entities.Login;
import com.app.entities.Patient;
import com.app.entities.RoleEntity;
import com.app.enums.RoleEnum;
import com.app.service.IAppointmentService;
import com.app.service.IDoctorService;
import com.app.service.IDoctorTimeTable;
import com.app.service.IPatientService;
import com.app.service.UserService;

import io.jsonwebtoken.lang.Arrays;

@RestController
@CrossOrigin
@RequestMapping("/api/doctor")
public class DoctorController {
	@Autowired
	private IDoctorService doctorService;
	@Autowired
	private UserService userService;
	@Autowired
	private IDoctorTimeTable doctorTimeTable;
	@Autowired
	private IAppointmentService appointmentService;

	@PutMapping("/profile_picture/{doctorId}")
	public ResponseEntity<?> uploadImage(@PathVariable long doctorId, @RequestParam MultipartFile imageFile)
			throws IOException {

		System.out.println("-------------------------------------");
		System.out.println("in upload image " + doctorId);
		System.out.println("uploaded img file name " + imageFile.getOriginalFilename() + " content type "
				+ imageFile.getContentType() + " size " + imageFile.getSize()); // invoke
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.uploadProfilePicture(doctorId, imageFile));

	}

	@PostMapping("/save_timetable")
	public ResponseEntity<?> saveTimetable(@RequestBody TimeTableDTO timeTableDTO) throws Exception {
		doctorTimeTable.saveDoctorTimetable(timeTableDTO);
		return ResponseEntity.status(HttpStatus.OK).body("Saved TImetable");
	}

	@PostMapping("/update_timetable")
	public ResponseEntity<?> updateTimeTable(@RequestBody DoctorTimeTableDTO dto) {
		doctorService.updateTimeTable(dto);
		return ResponseEntity.status(HttpStatus.OK).body("Timetable Updated");
	}

	@GetMapping("/get_appointment_list/{doctorId}")
	public ResponseEntity<?> getAppointmentList(@PathVariable long doctorId) throws Exception {
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllAppointmentListForDoctor(doctorId));
	}

	@GetMapping("/profile_picture/{imagePath}")
	public ResponseEntity<?> downloadImage(@PathVariable String imagePath, Image img) throws Exception {
		byte[] image = doctorService.restoreImageByPath(imagePath);
		img.setImage(image);
		return ResponseEntity.status(HttpStatus.OK).body(img);
	}

	@GetMapping("/get_all_open_appointment/{doctorId}")
	public ResponseEntity<?> getAllOpenAppointment(@PathVariable long doctorId) throws Exception {
		return ResponseEntity.status(HttpStatus.OK)
				.body(appointmentService.getAllOpenOppointmentListForDoctor(doctorId));
	}

	@GetMapping("/get_all_closed_appointment/{doctorId}")
	public ResponseEntity<?> getAllClosedAppointment(@PathVariable long doctorId) throws Exception {
		return ResponseEntity.status(HttpStatus.OK)
				.body(appointmentService.getAllClosedOppointmentListForDoctor(doctorId));
	}
	@PatchMapping("/update_password")
	public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordDTO dto) {
		doctorService.updatePassword(dto);
		return ResponseEntity.status(HttpStatus.OK).body("Password Updated Successfully");
	}
	@GetMapping("/get_doctor_timetable/{doctorId}")
	public ResponseEntity<?> getDoctorTimeTable(@PathVariable long doctorId){
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getDoctorTimetable(doctorId));
	}
	@DeleteMapping("/{doctorId}")
	public ResponseEntity<?> deleteDoctor(@PathVariable long doctorId){
//		doctorService.deleteDoctor(doctorId);
//		return ResponseEntity.status(HttpStatus.OK).body("Deleted Successfully");
		return ResponseEntity.status(HttpStatus.OK).body("Currently you cannot delete account");
	}
}
