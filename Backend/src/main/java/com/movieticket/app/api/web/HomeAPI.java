package com.movieticket.app.api.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieticket.app.dto.UserDTO;
import com.movieticket.app.entity.UserEntity;
import com.movieticket.app.service.IShowtimeService;
import com.movieticket.app.service.IUserService;

@RestController
@RequestMapping
public class HomeAPI {
	@Autowired IUserService userService;
	@Autowired IShowtimeService showtimeService;

	@PostMapping("register")
	UserEntity register(@RequestBody UserDTO userInfo) {
		userInfo.setRoleNames(null);
		return userService.create(userInfo);
	}
}
