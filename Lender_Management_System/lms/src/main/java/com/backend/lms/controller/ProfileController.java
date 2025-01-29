package com.backend.lms.controller;

import com.backend.lms.Entity.Lender;
import com.backend.lms.service.ProfileService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfileController {

    @Autowired
    private ProfileService profileService;


    // Get user details from session 
    @GetMapping("/api/user-details")
    public ResponseEntity<Map<String, String>> getUserDetails(HttpServletRequest request) {
        Map<String, String> userDetails = profileService.getUserDetails(request);
        if (userDetails != null) {
            return ResponseEntity.ok(userDetails);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
    }


    // Create a new lender profile (POST request)
    @PostMapping
    public ResponseEntity<Map<String, String>> createLenderProfile(@RequestBody Lender lender) {
        Map<String, String> result = profileService.createLenderProfile(lender);
        return ResponseEntity.ok().body(result);
    }


    // Get lender profile (GET request)
    @GetMapping("/{lenderId}")
    public ResponseEntity<Object> getLenderProfile(@PathVariable String lenderId) {
        Object lenderProfile = profileService.getLenderProfile(lenderId);
        return ResponseEntity.ok(lenderProfile);
    }


}
