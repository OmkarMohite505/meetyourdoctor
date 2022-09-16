package com.app.dao;

import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.app.repository.LoginRepository;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class TestUserRepository {
	@Autowired
	private LoginRepository userRepo;

//	@Test
//	void testFindByEmail() {
//		System.out.println(
//				userRepo.findByEmail("rama@gmail.com").orElseThrow(() -> new RuntimeException("invalid user email")));
//	}

}
