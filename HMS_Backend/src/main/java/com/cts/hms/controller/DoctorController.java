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

import com.cts.hms.model.Doctor;
import com.cts.hms.payload.ApiResponse;
import com.cts.hms.payload.DoctorRequest;
import com.cts.hms.service.DoctorService;

@RestController
@RequestMapping("/api/doctor")
public class DoctorController {

	@Autowired
	DoctorService doctorService;

	@PostMapping
	public ResponseEntity<?> createDoctor(@Valid @RequestBody DoctorRequest doctorRequest) {
		Doctor doctor = doctorService.createDoctor(doctorRequest);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{doctorId}").buildAndExpand(doctor.getId())
				.toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Doctor Created Successfully"));
	}
	
	@GetMapping
	public List<Doctor> getAllDoctors(){
		return doctorService.getDoctorList();
	}
	

	@GetMapping(value = "/{doctorId}")
	public Doctor getDoctorById(@PathVariable
			Long doctorId){
		return doctorService.getDoctorById(doctorId);
	}
}
