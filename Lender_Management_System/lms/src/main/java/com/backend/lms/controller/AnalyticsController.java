package com.backend.lms.controller;


import com.backend.lms.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @GetMapping("/analytics/{lenderId}")
    public ResponseEntity<?> getAnalytics(@PathVariable String lenderId, @RequestParam String loanType) {
        try {

            AnalyticsService.AnalyticsResponse response = analyticsService.getAnalytics(lenderId, loanType);
            return ResponseEntity.ok(response);
        } catch (Exception e) {

            System.err.println("Error occurred while fetching analytics: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("An error occurred while processing the request.");
        }
    }
}





