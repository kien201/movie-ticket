package com.movieticket.app.service;

import java.io.IOException;
import java.util.List;

import com.movieticket.app.dto.MovieDTO;
import com.movieticket.app.dto.Paging;
import com.movieticket.app.dto.ResultWithPaging;
import com.movieticket.app.entity.MovieEntity;

public interface IMovieService {
	ResultWithPaging<MovieEntity> findAll(Paging paging);
	
	List<MovieEntity> findAll();
	
	MovieEntity findOne(Long id);
	
	MovieEntity findBySlug(String slug);
	
	MovieEntity create(MovieDTO movieInfo) throws IllegalStateException, IOException;
	
	MovieEntity update(Long id, MovieDTO movieInfo) throws IllegalStateException, IOException;
	
	int delete(Long[] ids);
}
