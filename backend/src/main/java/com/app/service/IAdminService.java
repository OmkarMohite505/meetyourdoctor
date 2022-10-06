package com.app.service;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

public interface IAdminService {
	void storeHomeVideo(MultipartFile videoFile) throws IOException;
	
	byte[] downloadHomeVideo()throws IOException;

}
