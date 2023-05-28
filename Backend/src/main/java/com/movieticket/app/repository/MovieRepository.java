package com.movieticket.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.movieticket.app.entity.MovieEntity;

public interface MovieRepository extends BaseRepository<MovieEntity, Long>, MovieRepositotyCustom, JpaSpecificationExecutor<MovieEntity> {
	Page<MovieEntity> findBySearchValueContains(String q, Pageable pageable);
	
	@Query("select e, count(e) as ticketCount from #{#entityName} e left join e.showtimes s left join s.tickets t group by e order by ticketCount desc")
	List<MovieEntity> findByOrderByTicketCountDesc(Pageable pageable);
	
	Optional<MovieEntity> findBySlug(String slug);
}
