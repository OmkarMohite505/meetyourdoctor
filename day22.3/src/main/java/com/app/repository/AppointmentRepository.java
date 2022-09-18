package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.app.entities.Appointment;
import com.app.entities.Doctor;
import com.app.entities.Patient;
import java.util.List;

@Repository    // optional
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
	
	List<Appointment> findByPatient(Patient patient);
	
	List<Appointment> findByDoctor(Doctor doctor);
	
//	@Query(value = "select a from Appointment where status=?1 and patient=?2")
//	List<Appointment> getAllAppointmentListByStatusForPatient(String status, long patientId);

}
