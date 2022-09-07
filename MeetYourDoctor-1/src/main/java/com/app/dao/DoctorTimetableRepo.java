package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.DoctorTimeTable;

@Repository
public interface DoctorTimetableRepo extends JpaRepository<DoctorTimeTable, Long> {

}
