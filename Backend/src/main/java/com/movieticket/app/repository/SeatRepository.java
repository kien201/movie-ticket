package com.movieticket.app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import com.movieticket.app.entity.SeatEntity;

public interface SeatRepository extends BaseRepository<SeatEntity, Long> {
	List<SeatEntity> findByRoomId(Long roomId);
	Optional<SeatEntity> findByRoomIdAndRowOrderAndColumnOrder(Long roomId, int rowOrder, int columnOrder);
	
	@Query("select e from #{#entityName} e join e.ticketDetails d where d.ticket.showtime.id = :showtimeId")
	List<SeatEntity> getOccupiedByShowtimeId(Long showtimeId);
	
	@Query("select count(e)>0 from #{#entityName} e join e.ticketDetails d where d.ticket.showtime.id = :showtimeId and :id in e.id")
	boolean isSeatOccupied(Long id, Long showtimeId);
}