package com.backend.lms.Repository;

import com.backend.lms.Entity.Lender;
import com.backend.lms.Entity.LoanConfiguration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface LenderRepository extends JpaRepository<Lender, String> {



}


