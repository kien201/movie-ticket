package com.movieticket.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.movieticket.app.entity.TicketEntity;

public interface TicketRepository extends BaseRepository<TicketEntity, Long> {
	@Query("select e from #{#entityName} e "
			+ "where concat(e.createdDate,e.user.fullname,e.showtime.movie.name,e.showtime.room.cinema.name) like %:q% "
			+ "and :fromDate <= cast(e.createdDate as LocalDate) and cast(e.createdDate as LocalDate) <= :toDate")
	Page<TicketEntity> findByConcatFieldsContainsAndFromDateAndToDate(String q, LocalDate fromDate, LocalDate toDate, Pageable pageable);
	
	@Query("select e from #{#entityName} e where :fromDate <= cast(e.createdDate as LocalDate) and cast(e.createdDate as LocalDate) <= :toDate and e.active = true")
	List<TicketEntity> findByFromDateAndToDateAndActiveTrue(LocalDate fromDate, LocalDate toDate);
	
	List<TicketEntity> findByUserIdAndActiveTrueOrderByCreatedDateDesc(Long userId);

	@Modifying
	@Query("update #{#entityName} e set e.status = :status where e.id = :id")
	int updateStatusById(Long id, int status);
}
