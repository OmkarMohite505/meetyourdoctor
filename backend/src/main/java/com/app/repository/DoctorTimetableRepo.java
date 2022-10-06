package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.entities.DoctorTimeTable;

@Repository
public interface DoctorTimetableRepo extends JpaRepository<DoctorTimeTable, Long> {

}
