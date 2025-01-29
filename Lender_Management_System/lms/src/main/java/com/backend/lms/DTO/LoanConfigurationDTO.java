package com.backend.lms.DTO;

public class LoanConfigurationDTO {
    private Long id; // New unique ID for each loan configuration

    public LoanConfigurationDTO(Long id, String email, String name, double maxLoanAmount, String loanType, double interestRate, int loanTerm, double minLoanAmount, String lenderId) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.maxLoanAmount = maxLoanAmount;
        this.loanType = loanType;
        this.interestRate = interestRate;
        this.loanTerm = loanTerm;
        this.minLoanAmount = minLoanAmount;
        this.lenderId = lenderId;
    }


    private String loanType;
    private double interestRate;
    private int loanTerm;
    private double minLoanAmount;
    private double maxLoanAmount;
    private String lenderId;
    private String name;
    private double loanAmount;

    public String getLenderId() {
        return lenderId;
    }

    public void setLenderId(String lenderId) {
        this.lenderId = lenderId;
    }

    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLoanType() {
        return loanType;
    }

    public void setLoanType(String loanType) {
        this.loanType = loanType;
    }

    public double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(double interestRate) {
        this.interestRate = interestRate;
    }

    public int getLoanTerm() {
        return loanTerm;
    }

    public void setLoanTerm(int loanTerm) {
        this.loanTerm = loanTerm;
    }

    public double getMinLoanAmount() {
        return minLoanAmount;
    }

    public void setMinLoanAmount(double minLoanAmount) {
        this.minLoanAmount = minLoanAmount;
    }

    public double getMaxLoanAmount() {
        return maxLoanAmount;
    }

    public void setMaxLoanAmount(double maxLoanAmount) {
        this.maxLoanAmount = maxLoanAmount;
    }

    public String getName() {
        return name;
    }

    public double getLoanAmount() {
        return loanAmount;
    }

    public void setLoanAmount(double loanAmount) {
        this.loanAmount = loanAmount;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


}
