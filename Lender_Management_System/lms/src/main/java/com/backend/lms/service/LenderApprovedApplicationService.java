package com.backend.lms.service;

import com.backend.lms.DTO.PaymentDetailsDTO;
import com.backend.lms.Entity.EmiSchedule;
import com.backend.lms.Entity.LenderApprovedApplication;
import com.backend.lms.Entity.LoanApplication;
import com.backend.lms.Repository.EmiScheduleRepository;
import com.backend.lms.Repository.LenderApprovedApplicationRepository;
import com.backend.lms.Repository.LoanApplicationRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class LenderApprovedApplicationService {

    @Autowired
    private LenderApprovedApplicationRepository lenderApprovedApplicationRepository;

    @Autowired
    private LoanApplicationRepository loanApplicationRepository;

    @Autowired
    private EmiScheduleRepository emiScheduleRepository;

    @Autowired
    private EmailService emailService;

    @Transactional
    public String approveApplication(LenderApprovedApplication lenderApprovedApplication) {

        lenderApprovedApplication.setStatus("Approved");
        LoanApplication loanApplication = loanApplicationRepository.findByApplicationId(lenderApprovedApplication.getApplicationId());
        loanApplication.setStatus("Approved");
        loanApplicationRepository.save(loanApplication);

        lenderApprovedApplicationRepository.save(lenderApprovedApplication);

        // Save EMI schedule
        saveEmiSchedule(lenderApprovedApplication.getLoanId(), lenderApprovedApplication.getApplicationId(), lenderApprovedApplication.getEmiEstimatedPerMonth(), lenderApprovedApplication.getLoanTerm(), lenderApprovedApplication.getBorrowerName(), lenderApprovedApplication.getBorrowerEmail());

        // Send approval email
        emailService.sendApprovalEmail(lenderApprovedApplication.getBorrowerName(), lenderApprovedApplication.getBorrowerEmail(),
                lenderApprovedApplication.getLoanAmount().toString(), lenderApprovedApplication.getLoanId(), loanApplication.getLenderName());

        return "Application approved successfully";
    }

    private void saveEmiSchedule(String loanId, String applicationId, Double emiAmount, int loanTerm, String borrowerName, String borrowerEmail) {
        LocalDate currentDate = LocalDate.now();

        for (int i = 1; i <= loanTerm; i++) { // Assuming loanTerm is in months
            EmiSchedule emiSchedule = new EmiSchedule();
            emiSchedule.setLenderApprovedApplication(lenderApprovedApplicationRepository.findByLoanId(loanId));
            emiSchedule.setApplicationId(applicationId);
            emiSchedule.setEmiAmount(emiAmount);
            emiSchedule.setStatus("Due");
            emiSchedule.setInstallmentDate(currentDate.plusMonths(i));
            emiSchedule.setBorrowerName(borrowerName);
            emiSchedule.setBorrowerEmail(borrowerEmail);

            emiScheduleRepository.save(emiSchedule);
        }
    }

    public String rejectApplication(LenderApprovedApplication lenderApprovedApplication) {

        lenderApprovedApplication.setStatus("Rejected");
        LoanApplication loanApplication = loanApplicationRepository.findByApplicationId(lenderApprovedApplication.getApplicationId());
        loanApplication.setStatus("Rejected");
        loanApplicationRepository.save(loanApplication);

        lenderApprovedApplicationRepository.save(lenderApprovedApplication);

        // Send rejection email
        emailService.sendRejectionEmail(lenderApprovedApplication.getBorrowerName(), lenderApprovedApplication.getBorrowerEmail(), loanApplication.getLenderName());

        return "Application rejected successfully";
    }

    public LenderApprovedApplication getLoanDetails(String loanId) {
        return lenderApprovedApplicationRepository.findByLoanId(loanId);
    }

    public List<LenderApprovedApplication> getApprovedLoans(String lenderId) {
        return lenderApprovedApplicationRepository.findByLenderIdAndStatus(lenderId, "Approved");
    }

    public List<PaymentDetailsDTO> getEmiSchedule(String loanId) {
        List<EmiSchedule> emiSchedules = emiScheduleRepository.findByLoanId(loanId);
        return emiSchedules.stream().map(emi -> new PaymentDetailsDTO(
                emi.getId(),
                emi.getEmiAmount(),
                emi.getStatus(),
                emi.getInstallmentDate(),
                emi.getBorrowerName(),
                emi.getBorrowerEmail(),
                emi.getApplicationId(),
                emi.getLenderApprovedApplication().getLoanId()
        )).toList();
    }

    public String deleteLoanApplicationByLoanId(String loanId) {
        LenderApprovedApplication lenderApprovedApplication = lenderApprovedApplicationRepository.findByLoanId(loanId);
        if (lenderApprovedApplication == null) {
            return "Loan application with Loan ID " + loanId + " not found.";
        }
        // Delete related EMI schedules
        List<EmiSchedule> emiSchedules = emiScheduleRepository.findByLoanId(loanId);
        emiScheduleRepository.deleteAll(emiSchedules);

        lenderApprovedApplicationRepository.delete(lenderApprovedApplication);
        return "Loan application and associated EMI schedules deleted successfully.";
    }
}

