package com.movieticket.app.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.constants.Common;
import com.movieticket.app.dto.TicketDTO;
import com.movieticket.app.entity.SeatEntity;
import com.movieticket.app.entity.ShowtimeEntity;
import com.movieticket.app.entity.TicketEntity;
import com.movieticket.app.repository.SeatRepository;
import com.movieticket.app.repository.ShowtimeRepository;
import com.movieticket.app.repository.TicketRepository;
import com.movieticket.app.repository.UserRepository;
import com.movieticket.app.service.ITicketService;

@Service
@Transactional
public class TicketService implements ITicketService {
	@Autowired TicketRepository ticketRepository;
	@Autowired UserRepository userRepository;
	@Autowired ShowtimeRepository showtimeRepository;
	@Autowired SeatRepository seatRepository;
	
	public List<TicketEntity> findAll(){
		return ticketRepository.findAll(Sort.by(Direction.DESC, "id"));
	}
	
	public TicketEntity findOne(Long id) {
		return ticketRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Không tìm thấy vé"));
	}
	
	public TicketEntity create(TicketDTO ticketInfo) {
		TicketEntity ticket = new TicketEntity();
		ticket.setUser(userRepository.findById(ticketInfo.getUserId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy người dùng")));
		ShowtimeEntity showtime = showtimeRepository.findById(ticketInfo.getShowtimeId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy lịch chiếu"));
		
		if (showtime.getStartTime().minusMinutes(Common.ORDER_TICKET_VALID_BEFORE_MINUTES).isBefore(LocalDateTime.now())) throw new IllegalArgumentException("Đã quá hạn đặt vé, vui lòng đặt tại quầy thanh toán!");
		
		List<SeatEntity> occupiedSeats = seatRepository.getOccupiedByShowtimeId(showtime.getId());
		ticketInfo.getDetails().forEach(details -> {
			boolean isOccupied = occupiedSeats.stream().anyMatch(seat -> seat.getId() == details.getSeatId());
			if (isOccupied) throw new IllegalArgumentException("Ghế đã được đặt!");
		});
		ticket.setShowtime(showtime);
		
		return ticketRepository.save(ticket);
	}
	
	public TicketEntity update(Long id, TicketDTO ticketInfo) {
		TicketEntity ticket = findOne(id);
		ticket.setUser(userRepository.findById(ticketInfo.getUserId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy người dùng")));
		ticket.setShowtime(showtimeRepository.findById(ticketInfo.getShowtimeId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy lịch chiếu")));
//		ticketInfo.getDetails()
		return ticket;
	}
	
	public int delete(Long[] ids) {
		return ticketRepository.deleteByIdIn(ids);
	}
}
