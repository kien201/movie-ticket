package com.movieticket.app.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.constants.Common;
import com.movieticket.app.dto.MovieDTO;
import com.movieticket.app.dto.PageDTO;
import com.movieticket.app.dto.QueryFilter;
import com.movieticket.app.entity.MovieEntity;
import com.movieticket.app.repository.MovieRepository;
import com.movieticket.app.service.IMovieService;
import com.movieticket.app.utils.UploadUtil;

@Service
@Transactional
public class MovieService implements IMovieService {
	@Autowired MovieRepository movieRepository;
	
	public List<MovieEntity> findAll(){
		return movieRepository.findAll(Sort.by(Direction.DESC, "id"));
	}
	
	public List<MovieEntity> findTop3ByOrderByTicketCount(){
		return movieRepository.findByOrderByTicketCountDesc(PageRequest.of(0, 3));
	}

	public PageDTO<MovieEntity> findAll(QueryFilter filter){
		Page<MovieEntity> page = movieRepository.findBySearchValueContains(filter.getQ(), filter.toPageable());
		return PageDTO.from(page);
	}
	
	public PageDTO<MovieEntity> findAll(QueryFilter filter, String movieType){
		Page<MovieEntity> page = movieRepository.findBySearchValueContainsAndMovieTypeAndActiveTrue(filter.getQ(), movieType, filter.toPageable());
		return PageDTO.from(page);
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
