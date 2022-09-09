package com.app;

import java.io.File;
import java.util.Properties;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.spi.MatchingStrategy;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class Application implements CommandLineRunner {
	@Value("${file.upload.location}")
	private String folderName;

	@Value("${spring.mail.protocol}")
	private String protocol;

	@Value("${spring.mail.username}")
	private String userName;

	@Value("${spring.mail.password}")
	private String password;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
		
		//configure model mapper bean , with STRICT mapping instructions
		@Bean
		public ModelMapper mapper()
		{
			 ModelMapper modelMapper = new ModelMapper();
			 modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
			 return modelMapper;
		}
		
		@Bean
		public JavaMailSender getJavaMailSender() {
			JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
			mailSender.setHost("smtp.gmail.com");
			mailSender.setPort(587);

			mailSender.setUsername(userName);
			mailSender.setPassword(password);

			Properties props = mailSender.getJavaMailProperties();
			props.put("mail.transport.protocol", protocol);
			props.put("mail.smtp.auth", "true");
			props.put("mail.smtp.starttls.enable", "true");
			props.put("mail.debug", "true");

			return mailSender;
		}

		@Override
		public void run(String... args) throws Exception {
			System.out.println("in run " + folderName);
			// create images folder if it doesn't exist
			File dir = new File(folderName);
			if (!dir.exists()) {
				System.out.println("Created folder/s " + dir.mkdirs());
			} else
				System.out.println("folder alrdy exists");
		}

}
