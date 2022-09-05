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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.cts.hms.model.Appointment;
import com.cts.hms.payload.ApiResponse;
import com.cts.hms.payload.AppointmentRequest;
import com.cts.hms.payload.UserIdentityAvailability;
import com.cts.hms.service.AppointmentService;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {


	@Autowired
	AppointmentService appointmentService;

	@PostMapping
	public ResponseEntity<?> createAppointment(@Valid @RequestBody AppointmentRequest appointmentRequest) {
		Appointment appointment = appointmentService.createAppointment(appointmentRequest);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{appointmentId}").buildAndExpand(appointment.getId())
				.toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Appointment Created Successfully"));
	}

	@GetMapping
	public List<Appointment> getAllAppointments(){
		return appointmentService.getAppointmentList();
	}

	@GetMapping("/checkAvailability")
    public UserIdentityAvailability checkUsernameAvailability(@RequestParam(value = "date") String date,@RequestParam(value = "doctorId") Long doctorId) {
        Boolean isAvailable = !appointmentService.existsByDoctorIdAndAppointmentDate(date,doctorId);
        return new UserIdentityAvailability(isAvailable);
    }

	@GetMapping(value = "/{appointmentId}")
	public Appointment getAppointmentById(@PathVariable
			Long appointmentId){
		return appointmentService.getAppointmentById(appointmentId);
	}
	
	@GetMapping(value = "/patient/{patientId}")
	public Appointment getAppointmentByPatientId(@PathVariable
			Long patientId){
		return appointmentService.getAppointmentByPatientId(patientId);
	}
}
