package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.Appointment;

@Repository    // optional
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

}
