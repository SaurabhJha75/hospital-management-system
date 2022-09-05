package com.cts.hms.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cts.hms.model.Patient;
import com.cts.hms.payload.ApiResponse;
import com.cts.hms.payload.PatientRequest;
import com.cts.hms.service.PatientService;

@RestController
@RequestMapping("/api/patient")
public class PatientController {

	@Autowired
	PatientService patientService;

	@PostMapping
	public ResponseEntity<?> createPatient(@Valid @RequestBody PatientRequest patientRequest) {
		Patient patient = patientService.createPatient(patientRequest);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{patientId}").buildAndExpand(patient.getId())
				.toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Patient Created Successfully"));
	}
	
	@GetMapping
	public List<Patient> getAllPatients(){
		return patientService.getPatientList();
	}
	

	@GetMapping(value = "/{patientId}")
	public Patient getPatientById(@PathVariable
			Long patientId){
		return patientService.getPatientById(patientId);
	}
}
