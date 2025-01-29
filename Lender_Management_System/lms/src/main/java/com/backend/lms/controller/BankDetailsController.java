package com.backend.lms.controller;

import com.backend.lms.Entity.BankDetails;
import com.backend.lms.service.BankDetailsService;
import com.backend.lms.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class BankDetailsController {

    @Autowired
    private BankDetailsService bankDetailsService;



    @Autowired
    private EmailService emailService;

    @PostMapping("/pay-emi/{id}/{date}/{loanId}/{mail}")
    public ResponseEntity<Map<String, Object>> processPayment(@RequestBody BankDetails bankDetails,
                                                              @PathVariable Long id,
                                                              @PathVariable LocalDate date,
                                                              @PathVariable String loanId,
                                                              @PathVariable String mail) {

        Map<String, Object> response = bankDetailsService.processPayment(bankDetails, id, date, loanId, mail);


        if (response.get("status").equals("error")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            return ResponseEntity.ok(response);
        }

    }



    @GetMapping("/transactions/{loanId}")
    public ResponseEntity<Map<String, Object>> getTransactionsByLoanId(@PathVariable String loanId) {

        Map<String, Object> response = bankDetailsService.getTransactionsByLoanId(loanId);


        if (response.get("status").equals("error")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } else {
            return ResponseEntity.ok(response);
        }

    }
}
