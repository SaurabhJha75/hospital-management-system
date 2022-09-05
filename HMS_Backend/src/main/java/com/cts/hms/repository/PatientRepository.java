package com.cts.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.hms.model.Patient;

@Repository
public interface PatientRepository  extends JpaRepository<Patient, Long> {

}
