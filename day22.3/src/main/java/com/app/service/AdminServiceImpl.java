package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.Clock;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.entities.Doctor;
import com.app.entities.Public;
import com.app.repository.PublicRepository;

@Service
@Transactional
public class AdminServiceImpl implements IAdminService {
	@Value("${file.public.upload.location}")
	private String publicFolder;
	@Autowired
	private PublicRepository publicRepository;

	@Override
	public void storeHomeVideo(MultipartFile videoFile) throws IOException {
		Clock clock = Clock.systemDefaultZone();
		long milliSeconds=clock.millis();
		String completePath = publicFolder + File.separator + milliSeconds
				+ videoFile.getOriginalFilename();
		System.out.println("complete path " + completePath);
		Files.copy(videoFile.getInputStream(), Paths.get(completePath), StandardCopyOption.REPLACE_EXISTING);
		// save complete path to the image in db
		Public publicAssest = new Public();
		publicAssest.setHomeVideoPath(completePath);
		publicRepository.save(publicAssest);
	}

	@Override
	public byte[] downloadHomeVideo() throws IOException {
		Public publicAsset = publicRepository.findById((long)1).orElseThrow();
		return Files.readAllBytes(Paths.get(publicAsset.getHomeVideoPath()));
	}

}
