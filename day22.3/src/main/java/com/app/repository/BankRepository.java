package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.BankAccount;

public interface BankRepository extends JpaRepository<BankAccount, Long> {

}
