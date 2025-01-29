

package com.backend.lms.Entity;

import jakarta.persistence.*;


@Entity(name = "User_credentials")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "lender_id", referencedColumnName = "lenderId", nullable = false)
    private Lender lender;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String username;



    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Lender getLender() {
        return lender;
    }

    public void setLender(Lender lender) {
        this.lender = lender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }


}

