
package com.backend.lms.service;


import com.backend.lms.Entity.Lender;
import com.backend.lms.Entity.User;
import com.backend.lms.Repository.LenderRepository;

import com.backend.lms.Repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

import java.util.Map;

@Component
public class CustomOAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;

    private final LenderRepository lenderRepository;

    @Autowired
    public CustomOAuth2LoginSuccessHandler(UserRepository userRepository, LenderRepository lenderRepository) {
        this.userRepository = userRepository;

        this.lenderRepository = lenderRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String sub = (String) attributes.get("sub"); // Google's unique user ID

        // Check if the user exists in the database
        User user = userRepository.findByEmail(email);

        if (user == null) {

            Lender lender = new Lender();
            lender.setLenderId(sub);
            lender.setFullname(name);
            lender.setEmail(email);


            lenderRepository.save(lender);

            // Create a new User entity and associate it with the Lender
            user = new User();
            user.setEmail(email);
            user.setUsername(name);
            user.setLender(lender);


            userRepository.save(user);
        }

        // Store user details in the session
        HttpSession session = request.getSession();
        session.setAttribute("userEmail", email);
        session.setAttribute("userName", name);
        session.setAttribute("userLenderId", sub);

        // Redirect to the Dashboard page after successful login
        response.sendRedirect("http://localhost:4200/dashboard");
    }

}
