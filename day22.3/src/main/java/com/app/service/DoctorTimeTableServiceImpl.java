package com.app.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.repository.DoctorRepository;
import com.app.repository.DoctorTimetableRepo;
import com.app.dto.DoctorDTO;
import com.app.entities.Doctor;
import com.app.entities.DoctorTimeTable;

@Service
@Transactional
public class DoctorTimeTableServiceImpl implements IDoctorTimeTable {
	@Autowired
	private DoctorTimetableRepo timetableRepo;
	@Autowired
	private DoctorRepository doctorRepository;

	@Override
	public String saveDoctorTimetable(DoctorDTO doctorDTO) throws Exception {
		Set<DoctorTimeTable> temp = new HashSet<>();
		
		Set<DoctorTimeTable> timetable = doctorDTO.getTimetables();
		
		List<DoctorTimeTable> persistentTimetable = timetableRepo.saveAll(timetable);
		
		Doctor doctor = doctorRepository.findById(doctorDTO.getDoctorId()).orElseThrow(()->new Exception("Doctor Not Found"));
		
		for (DoctorTimeTable doctorTimeTable : persistentTimetable) {
//			temp.add(doctorTimeTable);
			doctor.getTimetables().add(doctorTimeTable);
		}
//		doctor.setTimetable(temp);
		return "Saved TImetable";
	}

	@Override
	public void updateDoctorTimeTable(DoctorDTO doctorDTO) {
		Set<DoctorTimeTable> timetable = doctorDTO.getTimetables();
		
		for (DoctorTimeTable doctorTimeTable : timetable) {
			DoctorTimeTable persistTimeTable = timetableRepo.findById(doctorTimeTable.getTimeTableId()).orElseThrow();
			
			persistTimeTable.setBreakTime(doctorTimeTable.getBreakTime());
			persistTimeTable.setStartTime(doctorTimeTable.getStartTime());
			persistTimeTable.setSlotDuration(doctorTimeTable.getSlotDuration());
			persistTimeTable.setEndTime(doctorTimeTable.getEndTime());
			persistTimeTable.setStatus(doctorTimeTable.getStatus());
			persistTimeTable.setWeekday(doctorTimeTable.getWeekday());
		}
//		timetableRepo.findById()
	}
	
}
