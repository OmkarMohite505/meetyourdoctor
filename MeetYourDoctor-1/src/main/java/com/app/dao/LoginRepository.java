package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.entities.Login;


public interface LoginRepository extends JpaRepository<Login,Long> {
	
	@Query("select distinct u from Login u join fetch u.roles where u.email=:em")
	Optional<Login> findByEmail(@Param("em") String email);
	
//	boolean existsByLoginName(String LoginName);
//	boolean existsByEmail(String email);
	
	@Query("select  u from Login u where u.userName=:nm")
	Optional<Login> fetchLoginDetails(@Param("nm") String LoginName);
	
	@Query("select u from Login u where u.email=:em")
	Optional<Login> findbyEmail(@Param("em") String email);
	
	Optional<Login> findByEmailAndPassword(String email, String password);
	
	Optional<Login> findByEmailAndOtp(String email, int otp);

}
