package com.movieticket.app.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.movieticket.app.dto.Paging;
import com.movieticket.app.dto.ResultWithPaging;
import com.movieticket.app.entity.MovieEntity;
import com.movieticket.app.service.MovieService;

@RestController
@RequestMapping(value = "movie")
public class MovieAPI {
	@Autowired MovieService movieService;
	
	@GetMapping
	ResultWithPaging<MovieEntity> getAll(@RequestParam(defaultValue = "page") String type, Paging paging) {
		return movieService.findAll(type, paging);
	}
	
	@GetMapping("{slug}")
	MovieEntity getOne(@PathVariable String slug) {
		return movieService.findBySlug(slug);
	}
}
