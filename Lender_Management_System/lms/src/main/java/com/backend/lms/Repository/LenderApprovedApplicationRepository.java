package com.backend.lms.Repository;


import com.backend.lms.Entity.LenderApprovedApplication;

import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface LenderApprovedApplicationRepository  extends JpaRepository<LenderApprovedApplication, String> {

    LenderApprovedApplication findByLoanId(String loanId);

    List<LenderApprovedApplication> findByLenderIdAndStatus(String lenderId, String approved);

    List<LenderApprovedApplication> findByLenderIdAndStatusAndLoanType(String lenderId, String approved, String loanType);
}
