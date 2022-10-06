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
import com.app.dto.TimeTableDTO;
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
	public String saveDoctorTimetable(TimeTableDTO timeTableDTO ) throws Exception {
		Set<DoctorTimeTable> temp = new HashSet<>();
		
		Set<DoctorTimeTable> timetables = timeTableDTO.getTimetables();
		
//		List<DoctorTimeTable> persistentTimetable = timetableRepo.saveAll(timetables);
		
		Doctor doctor = doctorRepository.getReferenceById(timeTableDTO.getDoctorId());
		
		for (DoctorTimeTable doctorTimeTable : timetables) {
			doctor.getTimetables().add(doctorTimeTable);
		}
		return "Saved TImetable";
	}

	@Override
	public void updateDoctorTimeTable(DoctorDTO doctorDTO) {
		Set<DoctorTimeTable> timetable = doctorDTO.getTimetables();
		
		for (DoctorTimeTable doctorTimeTable : timetable) {
			DoctorTimeTable persistTimeTable = timetableRepo.findById(doctorTimeTable.getTimeTableId()).orElseThrow();
			
			persistTimeTable.setBreakTime(doctorTimeTable.getBreakTime());
			persistTimeTable.setStartTime(doctorTimeTable.getStartTime());
			/* persistTimeTable.setSlotDuration(doctorTimeTable.getSlotDuration()); */
			persistTimeTable.setEndTime(doctorTimeTable.getEndTime());
			persistTimeTable.setStatus(doctorTimeTable.getStatus());
			persistTimeTable.setWeekday(doctorTimeTable.getWeekday());
		}
//		timetableRepo.findById()
	}
	
}
