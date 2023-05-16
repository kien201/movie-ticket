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
import com.movieticket.app.dto.ShowtimeDTO;
import com.movieticket.app.entity.ShowtimeEntity;
import com.movieticket.app.service.ShowtimeService;

@RestController
@RequestMapping(value = "admin/showtime")
public class ShowtimeAPI {
	@Autowired ShowtimeService showtimeService;
	
	@GetMapping
	List<ShowtimeEntity> getAll() {
		return showtimeService.findAll();
	}
	
	@GetMapping("{id}")
	ShowtimeEntity getOne(@PathVariable Long id) {
		return showtimeService.findOne(id);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('"+RoleName.MANAGE_SHOWTIME+"')")
	ShowtimeEntity create(@RequestBody ShowtimeDTO showtimeInfo) {
		return showtimeService.create(showtimeInfo);
	}
	
	@PutMapping("{id}")
	@PreAuthorize("hasAuthority('"+RoleName.MANAGE_SHOWTIME+"')")
	ShowtimeEntity update(@PathVariable Long id, @RequestBody ShowtimeDTO showtimeInfo) {
		return showtimeService.update(id, showtimeInfo);
	}
	
	@DeleteMapping
	@PreAuthorize("hasAuthority('"+RoleName.MANAGE_SHOWTIME+"')")
	int delete(@RequestBody Long[] ids) {
		return showtimeService.delete(ids);
	}
}