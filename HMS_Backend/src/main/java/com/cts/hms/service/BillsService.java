package com.cts.hms.service;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cts.hms.model.Bill;
import com.cts.hms.payload.BillRequest;
import com.cts.hms.repository.BillsRepository;

@Service
public class BillsService {
	@Autowired
	BillsRepository billsRepository;

	public Bill createBill(@Valid BillRequest billRequest) {
		Bill bill = new Bill(null, billRequest.getDoctorId(), billRequest.getDoctorName(),
				billRequest.getPatientId(), billRequest.getPatientName(), billRequest.getRegistrationFee(),
				billRequest.getOtherFee(), billRequest.getTotal());
		return billsRepository.save(bill);
	}

	public List<Bill> getBillList() {
		return billsRepository.findAll();
	}

	public Bill getBillById(Long id) {
		Optional<Bill> optional = billsRepository.findById(id);
		if (!optional.isPresent()) {
			return optional.get();
		} else {
			return null;
		}
	}
}
