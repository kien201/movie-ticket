package com.movieticket.app.dto;

import org.springframework.data.domain.Sort.Direction;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class Paging {
	int page = 1;
	int size = 10;
	int totalPages;
	long totalItems;
	String property = "id";
	Direction direction = Direction.DESC;
	
	public void setDirection(String direction) {
		this.direction = Direction.fromOptionalString(direction).orElse(Direction.DESC);
	}
}
