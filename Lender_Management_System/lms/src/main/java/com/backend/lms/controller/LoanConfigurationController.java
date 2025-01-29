package com.backend.lms.controller;

import com.backend.lms.DTO.LoanConfigurationDTO;
import com.backend.lms.Entity.LoanConfiguration;
import com.backend.lms.service.LoanConfigurationService;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/loan-configuration")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class LoanConfigurationController {

    @Autowired
    private  LoanConfigurationService loanConfigurationService;


    // getting user details from Auth
    @GetMapping("/user-details")
    public ResponseEntity<Map<String, String>> getUserDetails(HttpServletRequest request) {
        Map<String, String> userDetails = loanConfigurationService.getUserDetails(request);
        if (userDetails != null) {
            return ResponseEntity.ok(userDetails);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }

    // Posting loan configuration details from frontend to store in database
    @PostMapping
    public ResponseEntity<LoanConfigurationDTO> saveLoanConfiguration(@RequestBody LoanConfigurationDTO loanConfiguration) {
        LoanConfigurationDTO savedConfig = loanConfigurationService.saveLoanConfiguration(loanConfiguration);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedConfig);
    }



     //getting all existing loan configurations created by user
    @GetMapping("/all")
    public ResponseEntity<List<LoanConfiguration>> getAllLoanConfigurations(HttpServletRequest request) {
        List<LoanConfiguration> configurations = loanConfigurationService.getAllLoanConfigurations(request);
        if (configurations != null) {
            return ResponseEntity.ok(configurations);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    // deleting a loan configuration based on id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoanConfiguration(@PathVariable Long id) {
        if (loanConfigurationService.deleteLoanConfiguration(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Retrieving available Lenders for a particular Loan Type
    @PostMapping("/available-lenders")
    public ResponseEntity<?> getLoanConfigurations(@RequestBody LoanConfigurationDTO loanDetails) {

        List<LoanConfiguration> availableLenders = loanConfigurationService.getLoanConfigurations(loanDetails);
        List<LoanConfigurationDTO> loanConfigurationDTOS=new ArrayList<>();
        for(LoanConfiguration loanConfiguration:availableLenders){

            loanConfigurationDTOS.add(new LoanConfigurationDTO(loanConfiguration.getId(),loanConfiguration.getEmail(),loanConfiguration.getName(),loanConfiguration.getMaxLoanAmount(),
                    loanConfiguration.getLoanType(),loanConfiguration.getInterestRate(),loanConfiguration.getLoanTerm(),loanConfiguration.getMinLoanAmount(),loanConfiguration.getLender().getLenderId()));
        }
        return ResponseEntity.ok(loanConfigurationDTOS);
    }
}
