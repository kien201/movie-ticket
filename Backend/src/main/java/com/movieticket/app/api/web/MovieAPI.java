package com.movieticket.app.api.web;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieticket.app.dto.Paging;
import com.movieticket.app.dto.ResultWithPaging;
import com.movieticket.app.entity.MovieEntity;
import com.movieticket.app.entity.ShowtimeEntity;
import com.movieticket.app.service.IMovieService;
import com.movieticket.app.service.IShowtimeService;

@RestController
@RequestMapping(value = "movie")
public class MovieAPI {
	@Autowired IMovieService movieService;
	@Autowired IShowtimeService showtimeService;
	
	@GetMapping
	ResultWithPaging<MovieEntity> getAll(Paging paging) {
		return movieService.findAll(paging);
	}
	
	@GetMapping("{slug}")
	MovieEntity getOne(@PathVariable String slug) {
		return movieService.findBySlug(slug);
	}
	
	@GetMapping("{movieId}/showtime")
	List<ShowtimeEntity> findByCinemaIdAndStartTime(@PathVariable Long movieId, @DateTimeFormat(iso = ISO.DATE) LocalDate startTime){
		return showtimeService.findByMovieIdAndStartTime(movieId, startTime);
	}
}
