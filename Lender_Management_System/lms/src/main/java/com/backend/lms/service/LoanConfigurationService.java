package com.backend.lms.service;


import com.backend.lms.DTO.LoanConfigurationDTO;
import com.backend.lms.Entity.LoanConfiguration;
import com.backend.lms.Repository.LenderRepository;
import com.backend.lms.Repository.LoanConfigurationRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LoanConfigurationService {

    private final LoanConfigurationRepository loanConfigurationRepository;


    @Autowired
    private LenderRepository lenderRepository;

    public LoanConfigurationService(LoanConfigurationRepository loanConfigurationRepository) {
        this.loanConfigurationRepository = loanConfigurationRepository;
    }

    public Map<String, String> getUserDetails(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            String email = (String) session.getAttribute("userEmail");
            String name = (String) session.getAttribute("userName");
            String lenderId = (String) session.getAttribute("userLenderId");

            if (email != null && name != null && lenderId != null) {
                return Map.of(
                        "email", email,
                        "name", name,
                        "lenderId", lenderId
                );
            }
        }
        return null;
    }

    @Transactional
    public LoanConfigurationDTO saveLoanConfiguration(LoanConfigurationDTO loanConfiguration) {
        //HttpSession session = request.getSession(false);
        LoanConfiguration loanConfiguration1=new LoanConfiguration();
        System.out.println();
        String lenderId=loanConfiguration.getLenderId();
        loanConfiguration1.setLender(lenderRepository.findById(lenderId).get());
        loanConfiguration1.setLoanType(loanConfiguration.getLoanType());
        loanConfiguration1.setLoanTerm(loanConfiguration.getLoanTerm());
        loanConfiguration1.setInterestRate(loanConfiguration.getInterestRate());
        loanConfiguration1.setMaxLoanAmount(loanConfiguration.getMaxLoanAmount());
        loanConfiguration1.setMinLoanAmount(loanConfiguration.getMinLoanAmount());
        loanConfiguration1.setName(loanConfiguration.getName());
        loanConfiguration1.setEmail(loanConfiguration.getEmail());

        loanConfigurationRepository.save(loanConfiguration1);
        return loanConfiguration;
    }



    public List<LoanConfiguration> getAllLoanConfigurations(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute("userLenderId") == null) {
            return null;
        }
        String lenderId = (String) session.getAttribute("userLenderId");
        return loanConfigurationRepository.findByLenderId(lenderId);
    }

    public boolean deleteLoanConfiguration(Long id) {
        if (loanConfigurationRepository.existsById(id)) {
            loanConfigurationRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<LoanConfiguration> getLoanConfigurations(LoanConfigurationDTO loanDetails) {

        List<LoanConfiguration> loanConfigurations = loanConfigurationRepository
                .findByLoanType(loanDetails.getLoanType());


        return loanConfigurations.stream()
                .filter(config -> loanDetails.getLoanAmount() >= config.getMinLoanAmount() &&
                        loanDetails.getLoanAmount() <= config.getMaxLoanAmount() && loanDetails.getLoanTerm()<=config.getLoanTerm())
                .collect(Collectors.toList());
    }
}
