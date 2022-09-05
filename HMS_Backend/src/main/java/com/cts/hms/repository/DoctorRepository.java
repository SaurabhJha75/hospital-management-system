package com.cts.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.hms.model.Doctor;

@Repository
public interface DoctorRepository  extends JpaRepository<Doctor, Long> {

}
