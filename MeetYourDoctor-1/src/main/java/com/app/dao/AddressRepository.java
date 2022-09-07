package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

}
