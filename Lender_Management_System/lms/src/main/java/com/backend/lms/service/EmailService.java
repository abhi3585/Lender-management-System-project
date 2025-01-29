package com.backend.lms.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendLoanApplicationEmail(String lenderEmail, String lenderName, String borrowerName, String loanAmount) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(lenderEmail);
        helper.setSubject("New Loan Application Submitted");
        helper.setText("<p>Dear " + lenderName + ",</p>" +
                "<p>A new loan application has been submitted by " + borrowerName + ".</p>" +
                "<p>Loan Amount: " + loanAmount + "</p>" +
                "<p>Please check your dashboard for further details.</p>", true);

        emailSender.send(message);
    }

    public void sendApprovalEmail(String applicantName, String applicantEmail, String loanAmount, String loanId,String lenderName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(applicantEmail);
        message.setSubject("Loan Approval Notification");
        message.setText("Hi " + applicantName + ",\n\n" +
                "Your loan of " + loanAmount + " has been approved. Your Loan ID is " + loanId + ".\n" +
                "You can check your loan details on the dashboard.\n\n" +
                "Best regards.\n"+lenderName);
        emailSender.send(message);
    }

    public void sendRejectionEmail(String applicantName, String applicantEmail,String lenderName) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(applicantEmail);
        message.setSubject("Loan Rejection Notification");
        message.setText("Hi " + applicantName + ",\n\n" +
                "We regret to inform you that your loan application has been rejected.\n\n" +
                "Best regards,\n"+lenderName);
        emailSender.send(message);
    }

    public void sendPaymentSuccessEmail(String borrowerEmail, String loanId, String date, double balance) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(borrowerEmail);
        message.setSubject("Payment Successful");
        message.setText("Dear Borrower,\n\n"
                + "Your payment has been successfully processed.\n"
                + "Loan ID: " + loanId + "\n"
                + "Payment Date: " + date + "\n"
                + "Remaining Balance: ₹" + balance + "\n\n"
                + "Thank you for your payment.\n\n"
                + "Best regards,\n"
                + "LMS");

        emailSender.send(message);
    }

    public void sendEmiDueEmail(String borrowerName, String borrowerEmail, String dueDate, String loanType) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(borrowerEmail);
        message.setSubject("EMI Due Reminder");
        message.setText("Dear " + borrowerName + ",\n\n" +
                "This is a reminder that your EMI for the loan type \"" + loanType + "\" is due on " + dueDate + ".\n\n" +
                "Please ensure timely payment to avoid penalties.\n\n" +
                "Best regards,\nLMS");
        emailSender.send(message);
    }


}
