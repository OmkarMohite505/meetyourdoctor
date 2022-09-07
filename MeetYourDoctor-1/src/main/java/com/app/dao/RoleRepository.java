package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Role;
import com.app.entities.UserRoles;


public interface RoleRepository extends JpaRepository<Role, Long> {
	Optional<Role> findByUserRole(UserRoles role);
}
