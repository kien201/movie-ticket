package com.movieticket.app.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class TicketFilter extends QueryFilter {
	@DateTimeFormat(iso = ISO.DATE)
	private LocalDate fromDate;
	
	@DateTimeFormat(iso = ISO.DATE)
	private LocalDate toDate;
	
	private Integer cinemaId;
	
	private Integer movieId;
}
