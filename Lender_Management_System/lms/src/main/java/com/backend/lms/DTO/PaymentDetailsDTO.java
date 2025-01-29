package com.backend.lms.DTO;

import java.time.LocalDate;

public class PaymentDetailsDTO {

    private Long id;

    private Double emiAmount;
    private String status;
    private LocalDate installmentDate;
    private String borrowerName;
    private String borrowerEmail;
    private String applicationId;
    private  String LoanId;

    public PaymentDetailsDTO(Long id, Double emiAmount, String status, LocalDate installmentDate, String borrowerName, String borrowerEmail, String applicationId, String loanId) {
        this.id = id;
        this.emiAmount = emiAmount;
        this.status = status;
        this.installmentDate = installmentDate;
        this.borrowerName = borrowerName;
        this.borrowerEmail = borrowerEmail;
        this.applicationId = applicationId;
        LoanId = loanId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getEmiAmount() {
        return emiAmount;
    }

    public void setEmiAmount(Double emiAmount) {
        this.emiAmount = emiAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDate getInstallmentDate() {
        return installmentDate;
    }

    public void setInstallmentDate(LocalDate installmentDate) {
        this.installmentDate = installmentDate;
    }

    public String getBorrowerName() {
        return borrowerName;
    }

    public void setBorrowerName(String borrowerName) {
        this.borrowerName = borrowerName;
    }

    public String getBorrowerEmail() {
        return borrowerEmail;
    }

    public void setBorrowerEmail(String borrowerEmail) {
        this.borrowerEmail = borrowerEmail;
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getLoanId() {
        return LoanId;
    }

    public void setLoanId(String loanId) {
        LoanId = loanId;
    }

}
