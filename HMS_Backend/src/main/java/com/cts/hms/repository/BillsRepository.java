package com.cts.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cts.hms.model.Bill;

@Repository
public interface BillsRepository  extends JpaRepository<Bill, Long> {

}
