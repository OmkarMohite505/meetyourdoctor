package com.app.service;

import com.app.dto.DoctorDTO;

public interface IDoctorTimeTable {
	
	String saveDoctorTimetable(DoctorDTO doctorDTO)throws Exception;
	
	void updateDoctorTimeTable(DoctorDTO doctorDTO);

}
