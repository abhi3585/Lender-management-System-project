package com.backend.lms.service;

import com.backend.lms.Entity.BankDetails;
import com.backend.lms.Entity.EmiSchedule;

import com.backend.lms.Entity.TransactionHistory;
import com.backend.lms.Repository.EmiScheduleRepository;
import com.backend.lms.Repository.BankDetailsRepository;
import com.backend.lms.Repository.LenderApprovedApplicationRepository;
import com.backend.lms.Repository.TransactionHistoryRepository;

import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class BankDetailsService {

    @Autowired
    private BankDetailsRepository bankDetailsRepository;

    @Autowired
    private EmiScheduleRepository emiScheduleRepository;

    @Autowired
    private TransactionHistoryRepository transactionHistoryRepository;

    @Autowired
    private LenderApprovedApplicationRepository lenderApprovedApplicationRepository;  // Add this line to access LenderApprovedApplication

    @Autowired
    private EmailService emailService;

    // Method to process the payment
    @Transactional
    public Map<String, Object> processPayment(BankDetails bankDetails, Long id, LocalDate date, String loanId, String mail) {
        Map<String, Object> response = new HashMap<>();

        // Check if the EMI has already been paid
        EmiSchedule emiSchedule = emiScheduleRepository.findById(id).orElse(null);
        if (emiSchedule != null && "Paid".equals(emiSchedule.getStatus())) {
            response.put("status", "error");
            response.put("message", "Payment has already been processed for this EMI.");
            return response;
        }

        // Validate card number
        if (bankDetails.getCardNumber() == null || bankDetails.getCardNumber().isEmpty()) {
            response.put("status", "error");
            response.put("message", "Card number cannot be null or empty.");
            return response;
        }

        BankDetails existingBankDetails = bankDetailsRepository.findById(bankDetails.getCardNumber()).orElse(null);
        if (existingBankDetails == null) {
            response.put("status", "error");
            response.put("message", "Card number not found.");
            return response;
        }

        // Validate card holder name
        if (bankDetails.getCardHolderName() == null || bankDetails.getCardHolderName().isEmpty()) {
            response.put("status", "error");
            response.put("message", "Card holder name cannot be null or empty.");
            return response;
        }
        if (!existingBankDetails.getCardHolderName().equals(bankDetails.getCardHolderName())) {
            response.put("status", "error");
            response.put("message", "Invalid card holder name.");
            return response;
        }

        // Validate CVV
        if (bankDetails.getCvv() == null || bankDetails.getCvv().isEmpty()) {
            response.put("status", "error");
            response.put("message", "CVV cannot be null or empty.");
            return response;
        }
        if (!existingBankDetails.getCvv().equals(bankDetails.getCvv())) {
            response.put("status", "error");
            response.put("message", "Invalid CVV.");
            return response;
        }

        // Validate expiry date
        if (bankDetails.getExpiryDate() == null || bankDetails.getExpiryDate().isEmpty()) {
            response.put("status", "error");
            response.put("message", "Expiry date cannot be null or empty.");
            return response;
        }
        if (!existingBankDetails.getExpiryDate().equals(bankDetails.getExpiryDate())) {
            response.put("status", "error");
            response.put("message", "Invalid expiry date.");
            return response;
        }

        try {
            // Synchronized block to ensure thread safety when updating shared resources
            synchronized (existingBankDetails) {
                // Check if the balance is sufficient
                if (existingBankDetails.getBalance() < bankDetails.getBalance()) {
                    response.put("status", "error");
                    response.put("message", "Insufficient balance.");
                    return response;
                }

                // Update the bank balance
                existingBankDetails.setBalance(existingBankDetails.getBalance() - bankDetails.getBalance());
                bankDetailsRepository.save(existingBankDetails);

                String transactionId = UUID.randomUUID().toString();

                // Update EMI schedule
                EmiSchedule emiSchedule1 = emiScheduleRepository.findById(id).orElse(null);
                if (emiSchedule1 != null) {
                    emiSchedule1.setStatus("Paid");
                    emiScheduleRepository.save(emiSchedule1);  // Save the updated EMI schedule
                }

                // Save transaction details to the database
                TransactionHistory transactionHistory = new TransactionHistory();
                transactionHistory.setTransactionId(transactionId);
                transactionHistory.setLoanId(loanId);
                transactionHistory.setDate(date);
                transactionHistory.setEmail(mail);
                transactionHistory.setAmountPaid(bankDetails.getBalance());

                transactionHistoryRepository.save(transactionHistory);

                // Send email notification
                emailService.sendPaymentSuccessEmail(mail, loanId, date.toString(), existingBankDetails.getBalance());

                // Return success response
                response.put("status", "success");
                response.put("message", "Payment successful.");
                response.put("transactionId", transactionId);
                response.put("remainingBalance", existingBankDetails.getBalance());
            }
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Payment already processed by another user.");
        }

        return response;
    }

    public Map<String, Object> getTransactionsByLoanId(String loanId) {
        Map<String, Object> response = new HashMap<>();

        // Fetch all transactions for the given loanId
        List<TransactionHistory> transactions = transactionHistoryRepository.findByLoanId(loanId);

        if (transactions == null || transactions.isEmpty()) {
            response.put("status", "error");
            response.put("message", "No transactions found for the given Loan ID.");
            return response;
        }

        response.put("status", "success");
        response.put("transactions", transactions);
        return response;
    }

}