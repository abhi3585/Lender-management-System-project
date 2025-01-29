package com.backend.lms.Repository;

import com.backend.lms.Entity.LoanApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;



@Repository
public interface LoanApplicationRepository extends JpaRepository<LoanApplication, Long> {

    LoanApplication findByApplicationId(String applicationId);



    Optional<LoanApplication> findByBorrowerEmailAndLoanAmountAndLoanTerm(
            String borrowerEmail, Double loanAmount, Integer loanTerm);


    List<LoanApplication> findByLenderId(String lenderId);


}
