package com.backend.lms.service;

import com.backend.lms.Entity.EmiSchedule;
import com.backend.lms.Entity.LenderApprovedApplication;
import com.backend.lms.Repository.EmiScheduleRepository;
import com.backend.lms.Repository.LenderApprovedApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;



@Service
public class AnalyticsService {

    @Autowired
    private LenderApprovedApplicationRepository lenderApprovedApplicationRepository;

    @Autowired
    private EmiScheduleRepository emiScheduleRepository;

    public AnalyticsResponse getAnalytics(String lenderId, String loanType) {
        // Get all approved loans for the lender and the selected loan type
        List<LenderApprovedApplication> approvedLoans = lenderApprovedApplicationRepository.findByLenderIdAndStatusAndLoanType(lenderId, "Approved", loanType);

        if (approvedLoans.isEmpty()) {
            return new AnalyticsResponse(0, 0.0, 0.0, 0.0); // Return default response if no loans found
        }

        Integer approvedLoanCount = 0;
        double sumOfLoansDisbursed = 0.0;
        double totalRevenueFromInterest = 0.0;
        double totalOutstandingBalance = 0.0;

        // Calculate total loans disbursed, revenue from interest, and other metrics
        for (LenderApprovedApplication loan : approvedLoans) {
            approvedLoanCount += 1;
            sumOfLoansDisbursed += loan.getLoanAmount();

            // Calculate total revenue from interest
            double loanAmount = loan.getLoanAmount();
            double totalPayableAmount = loan.getTotalPayableAmount(); // Total amount to be paid (loan + interest)
            double revenueFromInterest = totalPayableAmount - loanAmount;

            totalRevenueFromInterest += revenueFromInterest;


            // Calculate outstanding balance (remaining balance after EMI payments)
            String loanId = loan.getLoanId();

            List<EmiSchedule> emiSchedules = emiScheduleRepository.getByLoanId(loanId, "Paid");

            double totalPaidAmount = emiSchedules.stream()
                    .mapToDouble(EmiSchedule::getEmiAmount)
                    .sum();

            totalOutstandingBalance += (totalPayableAmount - totalPaidAmount);
        }


        return new AnalyticsResponse(approvedLoanCount, sumOfLoansDisbursed, totalOutstandingBalance, totalRevenueFromInterest);
    }

    // Helper class to structure the analytics response
    public static class AnalyticsResponse {
        private Integer approvedLoanCount;
        private double totalLoansDisbursed;
        private double totalOutstandingBalance;
        private double totalRevenueFromInterest;

        public AnalyticsResponse(Integer approvedLoanCount, double totalLoansDisbursed, double totalOutstandingBalance, double totalRevenueFromInterest) {
            this.approvedLoanCount = approvedLoanCount;
            this.totalLoansDisbursed = totalLoansDisbursed;
            this.totalOutstandingBalance = totalOutstandingBalance;
            this.totalRevenueFromInterest = totalRevenueFromInterest;
        }

        // Getters and setters
        public Integer getApprovedLoanCount() {
            return approvedLoanCount;
        }

        public void setApprovedLoanCount(Integer approvedLoanCount) {
            this.approvedLoanCount = approvedLoanCount;
        }

        public double getTotalLoansDisbursed() {
            return totalLoansDisbursed;
        }

        public void setTotalLoansDisbursed(double totalLoansDisbursed) {
            this.totalLoansDisbursed = totalLoansDisbursed;
        }

        public double getTotalOutstandingBalance() {
            return totalOutstandingBalance;
        }

        public void setTotalOutstandingBalance(double totalOutstandingBalance) {
            this.totalOutstandingBalance = totalOutstandingBalance;
        }

        public double getTotalRevenueFromInterest() {
            return totalRevenueFromInterest;
        }

        public void setTotalRevenueFromInterest(double totalRevenueFromInterest) {
            this.totalRevenueFromInterest = totalRevenueFromInterest;
        }
    }
}


