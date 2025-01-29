package com.backend.lms.controller;

import com.backend.lms.Entity.LoanApplication;
import com.backend.lms.service.LoanApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService loanApplicationService;

    @PostMapping("/loan-applications")
    public ResponseEntity<?> submitLoanApplication(@RequestBody LoanApplication loanApplication) {
        try {
            LoanApplication savedApplication = loanApplicationService.submitLoanApplication(loanApplication);
            return ResponseEntity.ok(savedApplication);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/loan-applications/{lenderId}")
    public ResponseEntity<List<LoanApplication>> getLoanApplicationsByLenderId(@PathVariable String lenderId) {
        List<LoanApplication> applications = loanApplicationService.getLoanApplicationsByLenderId(lenderId);
        if (applications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }
        return ResponseEntity.ok(applications);
    }



    @DeleteMapping("/loan-applications/{applicationId}")
    public ResponseEntity<?> deleteLoanApplication(@PathVariable String applicationId) {
        try {
            String result = loanApplicationService.deleteLoanApplication(applicationId);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.ok().body(e.getMessage());
        }
    }
}
