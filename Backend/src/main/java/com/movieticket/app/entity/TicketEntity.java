package com.movieticket.app.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ticket")
@Getter @Setter
public class TicketEntity extends BaseEntity {
	
	@ManyToOne
	private UserEntity user;

	@ManyToOne
	private ShowtimeEntity showtime;
	
	@OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<TicketDetailEntity> ticketDetails = new HashSet<>();
	
	@Transient
	@Setter(AccessLevel.NONE)
	private int totalPrice;

	public void setTotalPrice() {
		this.totalPrice = ticketDetails.stream()
								.reduce(0, (total, ticketDetail)->total += ticketDetail.getQuantity() * ticketDetail.getPrice(), Integer::sum);
	}
}
