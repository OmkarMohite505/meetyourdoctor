package com.app.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "otp")
public class OTP {
    @Id
    @Column(length = 40)
    private String email;
    private int otp;
    private LocalDateTime dateCreated;
}