package com.movieticket.app.service;

import java.util.List;

import com.movieticket.app.dto.TicketDTO;
import com.movieticket.app.entity.TicketEntity;

public interface ITicketService {
	List<TicketEntity> findAll();
	
	TicketEntity findOne(Long id);
	
	TicketEntity create(TicketDTO ticketInfo);
	
	TicketEntity update(Long id, TicketDTO ticketInfo);
	
	int delete(Long[] ids);
}
