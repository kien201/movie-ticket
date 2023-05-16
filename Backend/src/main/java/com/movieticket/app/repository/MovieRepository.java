package com.movieticket.app.repository;

import java.util.Optional;

import com.movieticket.app.entity.MovieEntity;

public interface MovieRepository extends BaseRepository<MovieEntity, Long> {
	Optional<MovieEntity> findBySlug(String slug);
}
