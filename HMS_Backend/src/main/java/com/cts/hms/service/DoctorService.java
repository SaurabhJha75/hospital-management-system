package com.cts.hms.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.hms.model.Doctor;
import com.cts.hms.payload.DoctorRequest;
import com.cts.hms.repository.DoctorRepository;

@Service
public class DoctorService {

	@Autowired
	DoctorRepository doctorRepository;

	public Doctor createDoctor(@Valid DoctorRequest doctorRequest) {
		Doctor doctor = new Doctor(null, doctorRequest.getName(), doctorRequest.getGender(),
				doctorRequest.getDepartment(), doctorRequest.getAddress(), doctorRequest.getEmail(),
				doctorRequest.getPhone(), doctorRequest.getFee());
		return doctorRepository.save(doctor);
	}

	public List<Doctor> getDoctorList() {
		return doctorRepository.findAll();
	}

	public Doctor getDoctorById(Long id) {
		Optional<Doctor> optional = doctorRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		} else {
			return new Doctor(null, null, null, null, null, null, null, 0);
		}
	}
}
