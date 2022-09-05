package com.cts.hms.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.hms.model.Patient;
import com.cts.hms.payload.PatientRequest;
import com.cts.hms.repository.PatientRepository;

@Service
public class PatientService {

	@Autowired
	PatientRepository patientRepository;

	public Patient createPatient(@Valid PatientRequest patientRequest) {
		Patient patient = new Patient(null, patientRequest.getName(), patientRequest.getAge(), patientRequest.getGender(),patientRequest.getSymptoms(),patientRequest.getAddress()
				,patientRequest.getEmail(),patientRequest.getPhone());
		return patientRepository.save(patient);
	}
	
	public List<Patient> getPatientList(){
		return patientRepository.findAll();
	}
	
	public Patient getPatientById(Long id) {
		Optional<Patient> optional = patientRepository.findById(id);
		if(optional.isPresent()) {
			return optional.get();
		}else {
			return new Patient(null, null, 0, null, null, null, null, null);
		}
	}
}
