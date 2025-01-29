package com.backend.lms.service;

import com.backend.lms.Entity.LoanApplication;
import com.backend.lms.Repository.LoanApplicationRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LoanApplicationService {

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @Autowired
    private EmailService emailService;

    // Method to submit a loan application
    @Transactional
    public LoanApplication submitLoanApplication(LoanApplication loanApplication) throws Exception {
        // Check if the application already exists
        Optional<LoanApplication> existingApplication = loanApplicationRepository.findByBorrowerEmailAndLoanAmountAndLoanTerm(
                loanApplication.getBorrowerEmail(), loanApplication.getLoanAmount(), loanApplication.getLoanTerm());

        if (existingApplication.isPresent()) {
            throw new Exception("A similar loan application already exists.");
        }

        // Send email to the lender
        try {
            emailService.sendLoanApplicationEmail(
                    loanApplication.getLenderEmail(),
                    loanApplication.getLenderName(),
                    loanApplication.getBorrowerName(),
                    loanApplication.getLoanAmount().toString()
            );
        } catch (MessagingException e) {
            throw new Exception("Failed to send email to the lender.");
        }

        // Save the loan application if no duplicate is found
        return loanApplicationRepository.save(loanApplication);
    }

    // Method to get loan applications by lender ID
    public List<LoanApplication> getLoanApplicationsByLenderId(String lenderId) {
        return loanApplicationRepository.findByLenderId(lenderId);
    }

    // Method to delete a loan application
    public String deleteLoanApplication(String applicationId) throws Exception {
        LoanApplication loanApplication = loanApplicationRepository.findByApplicationId(applicationId);
        if (loanApplication == null) {
            throw new Exception("Loan application with ID " + applicationId + " not found.");
        }

        loanApplicationRepository.delete(loanApplication);
        return "Loan application deleted successfully.";
    }
}
