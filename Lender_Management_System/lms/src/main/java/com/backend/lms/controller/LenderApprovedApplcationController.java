package com.backend.lms.controller;

import com.backend.lms.DTO.PaymentDetailsDTO;
import com.backend.lms.Entity.EmiSchedule;
import com.backend.lms.Entity.LenderApprovedApplication;
import com.backend.lms.service.LenderApprovedApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class LenderApprovedApplcationController {

    @Autowired
    private LenderApprovedApplicationService lenderApprovedApplicationService;

    @PostMapping("/approveLenderApplication")
    public ResponseEntity<String> approveApplication(@RequestBody LenderApprovedApplication lenderApprovedApplication) {
        String response = lenderApprovedApplicationService.approveApplication(lenderApprovedApplication);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/rejectLenderApplication")
    public ResponseEntity<String> rejectApplication(@RequestBody LenderApprovedApplication lenderApprovedApplication) {
        String response = lenderApprovedApplicationService.rejectApplication(lenderApprovedApplication);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/loan-details/{loanId}")
    public ResponseEntity<LenderApprovedApplication> getLoanDetails(@PathVariable String loanId) {
        LenderApprovedApplication loanDetails = lenderApprovedApplicationService.getLoanDetails(loanId);
        if (loanDetails != null) {
            return ResponseEntity.ok(loanDetails);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/approved-loans/{lenderId}")
    public ResponseEntity<?> getApprovedLoans(@PathVariable String lenderId) {
        List<LenderApprovedApplication> approvedLoans = lenderApprovedApplicationService.getApprovedLoans(lenderId);
        if (approvedLoans.isEmpty()) {
            return ResponseEntity.ok("No approved loan applications found for this lender.");
        }
        return ResponseEntity.ok(approvedLoans);
    }

    @GetMapping("/emi-schedule/{loanId}")
    public ResponseEntity<List<PaymentDetailsDTO>> getEmiSchedule(@PathVariable String loanId) {
        List<PaymentDetailsDTO> emiScheduleList = lenderApprovedApplicationService.getEmiSchedule(loanId);
        if (!emiScheduleList.isEmpty()) {
            return ResponseEntity.ok(emiScheduleList);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @DeleteMapping("/delete-approved-loans/{loanId}")
    public ResponseEntity<Map<String,String>> deleteLoanApplicationByLoanId(@PathVariable String loanId) {
        String response = lenderApprovedApplicationService.deleteLoanApplicationByLoanId(loanId);
        Map<String,String>map=new HashMap<>();
        if (response.contains("not found")) {
            map.put("error","failed");
            return ResponseEntity.ok(map);

        }
        map.put("message","deleted successfully");
        return ResponseEntity.ok(map);
    }
}
