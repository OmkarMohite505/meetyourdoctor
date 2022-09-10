package com.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.entities.Doctor;
import com.app.entities.Patient;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	Optional<Doctor> findByLoginEmail(String email);
	
//	@Query(value = "select d from Doctor d where d.address.town=?1")
//	List<Doctor> findAllDoctorsByTown(String town);
//	
//	@Query(value = "select d from Doctor d where d.address.city=?1")
//	List<Doctor> findAllDoctorsByCity(String city);
//	
////	@Query(value = "select d from Doctor d where d.address.state=?1")
////	List<Doctor> findAllDoctorsByState(String state);
//	
//	@Query(value = "select d from Doctor d where d.address.country=?1")
//	List<Doctor> findAllDoctorsByCountry(String country);
//	
//	@Query(value = "select d from Doctor d where d.address.pincode=?1")
//	List<Doctor> findAllDoctorsByPinCode(int pincode);
	
}
