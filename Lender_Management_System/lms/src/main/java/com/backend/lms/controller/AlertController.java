package com.backend.lms.controller;

import com.backend.lms.DTO.AlertRequest;
import com.backend.lms.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AlertController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send-alert")
    public ResponseEntity<?> sendAlert(@RequestBody AlertRequest alertRequest) {
        try {

            emailService.sendEmiDueEmail(alertRequest.getBorrowerName(), alertRequest.getBorrowerEmail(), alertRequest.getDate(),alertRequest.getLoanType());


            return ResponseEntity.ok().body(new ResponseMessage("Alert sent successfully"));
        } catch (Exception e) {

            return ResponseEntity.ok().body(new ResponseMessage("Error sending alert: " + e.getMessage()));
        }
    }


    public static class ResponseMessage {
        private String message;

        public ResponseMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }
}
