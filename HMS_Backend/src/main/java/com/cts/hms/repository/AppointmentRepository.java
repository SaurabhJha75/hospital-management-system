package com.cts.hms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.hms.model.Appointment;

@Repository
public interface AppointmentRepository  extends JpaRepository<Appointment, Long> {

	boolean existsByDoctorIdAndAppointmentDate(Long doctorId, String date);

	Optional<Appointment> findByPatientId(Long patientId);

	List<Appointment> findAllByPatientId(Long patientId);

}
