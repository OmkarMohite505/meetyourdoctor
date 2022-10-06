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
	
	@Value("${file.public.upload.location}")
	private String publicFolder;
	
	@Value("${file.profile.upload.location}")
	private String profileFolder;
	
	@Value("${file.appointment.upload.location}")
	private String appointmentFolder;

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
			File dir2 = new File(publicFolder);
			File dir3 = new File(profileFolder);
			File dir4 = new File(appointmentFolder);
			if (!dir.exists()) {
				System.out.println("Created folder/s " + dir.mkdirs());
			} else
				System.out.println("folder alrdy exists");
			if(!dir2.exists())
				dir2.mkdir();
			if(!dir3.exists())
				dir3.mkdir();
			if(!dir4.exists())
				dir4.mkdir();
		}

}
