package com.backend.lms.service;

import com.backend.lms.Entity.Lender;
import com.backend.lms.Repository.LenderRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ProfileService {

    @Autowired
    private LenderRepository lenderRepository;

    // Method to save lender profile
    public Map<String, String> createLenderProfile(Lender lender) {
        lenderRepository.save(lender);
        Map<String, String> result = new HashMap<>();
        result.put("message", "Profile saved successfully");
        return result;
    }

    // Method to get user details from session
    public Map<String, String> getUserDetails(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            String email = (String) session.getAttribute("userEmail");
            String name = (String) session.getAttribute("userName");
            String lenderId = (String) session.getAttribute("userLenderId");

            if (email != null && name != null && lenderId != null) {
                Map<String, String> userDetails = new HashMap<>();
                userDetails.put("email", email);
                userDetails.put("name", name);
                userDetails.put("lenderId", lenderId);
                return userDetails;
            }
        }
        return null;
    }

    // Method to get lender profile by lenderId
    public Object getLenderProfile(String lenderId) {
        Lender lender = lenderRepository.findById(lenderId).orElse(null);
        if (lender != null) {
            return lender;
        } else {
            return "First time login, please complete the profile";
        }
    }


}
