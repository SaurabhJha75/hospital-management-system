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

import com.cts.hms.model.Bill;
import com.cts.hms.payload.ApiResponse;
import com.cts.hms.payload.BillRequest;
import com.cts.hms.service.BillsService;

@RestController
@RequestMapping("/api/billing")
public class BillingController {

	@Autowired
	BillsService billsService;

	@PostMapping
	public ResponseEntity<?> createBill(@Valid @RequestBody BillRequest billRequest ) {
		Bill bill = billsService.createBill(billRequest);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{billId}").buildAndExpand(bill.getId())
				.toUri();

		return ResponseEntity.created(location).body(new ApiResponse(true, "Bill Created Successfully"));
	}
	
	@GetMapping
	public List<Bill> getAllBills(){
		return billsService.getBillList();
	}
	

	@GetMapping(value = "/{billId}")
	public Bill getBillById(@PathVariable
			Long billId){
		return billsService.getBillById(billId);
	}
	
}
