package com.movieticket.app.entity;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "showtime")
@Getter @Setter
public class ShowtimeEntity extends BaseEntity {
	
	private LocalDateTime startTime;
	
	@ManyToOne
	private MovieEntity movie;
	
	@ManyToOne
	private RoomEntity room;

	@OneToMany(mappedBy = "showtime", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private Set<TicketEntity> tickets = new HashSet<>();
}
