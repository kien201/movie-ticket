package com.movieticket.app.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;

import org.apache.commons.io.FilenameUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

public class UploadUtil {
	
	public static String store(MultipartFile file, String dirFromClasspath) throws IllegalStateException, IOException {
		File dir = Paths.get(ResourceUtils.getFile("classpath:").toString(), dirFromClasspath).toFile();
		if (!dir.exists()) dir.mkdirs();
		
		String originalFilename = file.getOriginalFilename();
		String filename = SlugUtil.generate(FilenameUtils.getBaseName(originalFilename)) + "." + FilenameUtils.getExtension(originalFilename);
		file.transferTo(Paths.get(dir.toString(), filename));
		return filename;
	}

}
