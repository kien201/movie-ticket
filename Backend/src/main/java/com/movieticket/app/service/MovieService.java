package com.movieticket.app.service;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.constants.Common;
import com.movieticket.app.dto.MovieDTO;
import com.movieticket.app.dto.Paging;
import com.movieticket.app.dto.ResultWithPaging;
import com.movieticket.app.entity.MovieEntity;
import com.movieticket.app.repository.MovieRepository;
import com.movieticket.app.utils.UploadUtil;

@Service
@Transactional
public class MovieService {
	@Autowired MovieRepository movieRepository;

	public ResultWithPaging<MovieEntity> findAll(String type, Paging paging){
		ResultWithPaging<MovieEntity> rs = new ResultWithPaging<>();
		switch(type) {
			case "page":
				Page<MovieEntity> page = movieRepository.findAll(PageRequest.of(paging.getPage()-1, paging.getSize(), paging.getDirection(), paging.getProperty()));
				rs.setResult(page.getContent());
				paging.setTotalItems(page.getTotalElements());
				paging.setTotalPages(page.getTotalPages());
				rs.setPaging(paging);
				break;
			case "all":
				List<MovieEntity> movies = movieRepository.findAll(Sort.by(paging.getDirection(), paging.getProperty()));
				rs.setResult(movies);
				break;
		}
		return rs;
	}
	
	public MovieEntity findOne(Long id) {
		return movieRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Không tìm thấy phim"));
	}
	
	public MovieEntity findBySlug(String slug) {
		return movieRepository.findBySlug(slug).orElseThrow(()-> new NoSuchElementException("Không tìm thấy phim"));
	}
	
	public MovieEntity create(MovieDTO movieInfo) throws IllegalStateException, IOException {
		MovieEntity movie = new MovieEntity();
		BeanUtils.copyProperties(movieInfo, movie);
		if (movieInfo.getThumbnailFile() != null && !movieInfo.getThumbnailFile().isEmpty()) {
			String filename = UploadUtil.store(movieInfo.getThumbnailFile(), Common.UPLOAD_DIR);
			movie.setThumbnail(filename);
		} else movie.setThumbnail(Common.DEFAULT_IMAGE_NAME);
		return movieRepository.save(movie);
	}
	
	public MovieEntity update(Long id, MovieDTO movieInfo) throws IllegalStateException, IOException {
		MovieEntity movie = findOne(id);
		BeanUtils.copyProperties(movieInfo, movie);
		if (movieInfo.getThumbnailFile() != null && !movieInfo.getThumbnailFile().isEmpty()) {
			String filename = UploadUtil.store(movieInfo.getThumbnailFile(), Common.UPLOAD_DIR);
			movie.setThumbnail(filename);
		}
		if (movie.getThumbnail() == null) movie.setThumbnail(Common.DEFAULT_IMAGE_NAME);
		return movie;
	}
	
	public int delete(Long[] ids) {
		return movieRepository.deleteByIdIn(ids);
	}
}
