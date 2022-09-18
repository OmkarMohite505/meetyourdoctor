package com.app.service;

import com.app.dto.DoctorDTO;
import com.app.dto.TimeTableDTO;

public interface IDoctorTimeTable {
	
	String saveDoctorTimetable(TimeTableDTO timeTableDTO)throws Exception;
	
	void updateDoctorTimeTable(DoctorDTO doctorDTO);

}
