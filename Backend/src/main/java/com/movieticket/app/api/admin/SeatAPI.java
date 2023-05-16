package com.movieticket.app.api.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.movieticket.app.constants.RoleName;
import com.movieticket.app.dto.SeatDTO;
import com.movieticket.app.entity.SeatEntity;
import com.movieticket.app.service.SeatService;

@RestController
@RequestMapping(value = "admin/seat")
public class SeatAPI {
	@Autowired SeatService seatService;
	
	@GetMapping
	List<SeatEntity> getAll() {
		return seatService.findAll();
	}
	
	@GetMapping("{id}")
	SeatEntity getOne(@PathVariable Long id) {
		return seatService.findOne(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('"+RoleName.MANAGE_CINEMA+"')")
	SeatEntity create(@RequestBody SeatDTO seatInfo) {
		return seatService.create(seatInfo);
	}
	
	@PutMapping("{id}")
	@PreAuthorize("hasAuthority('"+RoleName.MANAGE_CINEMA+"')")
	SeatEntity update(@PathVariable Long id, @RequestBody SeatDTO seatInfo) {
		return seatService.update(id, seatInfo);
	}
	
	@DeleteMapping
	@PreAuthorize("hasAuthority('"+RoleName.MANAGE_CINEMA+"')")
	int delete(@RequestBody Long[] ids) {
		return seatService.delete(ids);
	}
}