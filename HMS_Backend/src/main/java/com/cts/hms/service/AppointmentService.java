package com.cts.hms.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.hms.model.Appointment;
import com.cts.hms.payload.AppointmentRequest;
import com.cts.hms.repository.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	AppointmentRepository appointmentRepository;
	
	public Appointment createAppointment(@Valid AppointmentRequest appointmentRequest) {
		Appointment doctor = new Appointment(null, appointmentRequest.getDoctorId(),appointmentRequest.getDoctorName(),
				appointmentRequest.getPatientId(), appointmentRequest.getPatientName(), appointmentRequest.getAppointmentDate(),appointmentRequest.getAppointmentTime(),appointmentRequest.getSymptoms());
		return appointmentRepository.save(doctor);
	}
	
	public List<Appointment> getAppointmentList(){
		return appointmentRepository.findAll();
	}
	
	public Appointment getAppointmentById(Long id) {
		Optional<Appointment> optional = appointmentRepository.findById(id);
		if(!optional.isPresent()) {
			return optional.get();
		}else {
			return null;
		}
	}

	public boolean existsByDoctorIdAndAppointmentDate(String date, Long doctorId) {
		return appointmentRepository.existsByDoctorIdAndAppointmentDate(doctorId,date);
	}

	public Appointment getAppointmentByPatientId(Long patientId) {
		List<Appointment> list = appointmentRepository.findAllByPatientId(patientId);
		if(!list.isEmpty()) {
			return list.get(0);
		}else {
			return new Appointment(null, 0, null, 0, null, null, null, null);
		}
	}
}
