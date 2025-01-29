

package com.backend.lms.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class EmiSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double emiAmount;
    private String status;
    private LocalDate installmentDate;
    private String borrowerName;
    private String borrowerEmail;
    private String applicationId;
    @Version
    private int version;


    @ManyToOne
    @JoinColumn(name = "loan_id", nullable = false)
    private LenderApprovedApplication lenderApprovedApplication;

    // Getters and Setters

    public String getApplicationId() {

        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
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

    public LenderApprovedApplication getLenderApprovedApplication() {
        return lenderApprovedApplication;
    }

    public void setLenderApprovedApplication(LenderApprovedApplication lenderApprovedApplication) {
        this.lenderApprovedApplication = lenderApprovedApplication;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}