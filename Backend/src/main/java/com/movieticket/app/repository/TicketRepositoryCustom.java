package com.movieticket.app.repository;

import org.springframework.data.domain.Page;

import com.movieticket.app.dto.ReportOutputDTO;
import com.movieticket.app.dto.TicketFilter;
import com.movieticket.app.entity.TicketEntity;

public interface TicketRepositoryCustom {
	Page<TicketEntity> findByFilter(TicketFilter filter);
	ReportOutputDTO getReport(TicketFilter filter);
}
