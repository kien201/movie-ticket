package com.movieticket.app.api.web;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.movieticket.app.entity.UserEntity;
import com.movieticket.app.security.AuthCookie;
import com.movieticket.app.service.UserService;
import com.movieticket.app.utils.CookieUtil;

@RestController
@RequestMapping(value = "profile")
public class ProfileAPI {
	@Autowired
	UserService userService;
	
	@GetMapping
	UserEntity getCurrentUser() {
		String username = SecurityContextHolder.getContext().getAuthentication().getName();
		return userService.findByUsername(username);
	}
	
	@PostMapping("logout")
	String logout(HttpServletRequest request, HttpServletResponse response) {
		Cookie authCookie = CookieUtil.getCookie(AuthCookie.NAME, request);
		authCookie.setPath("/");
		authCookie.setMaxAge(0);
		response.addCookie(authCookie);
		return "Đăng xuất thành công";
	}
}
