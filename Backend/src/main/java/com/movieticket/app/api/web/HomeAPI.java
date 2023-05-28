package com.movieticket.app.api.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.movieticket.app.dto.UserDTO;
import com.movieticket.app.entity.FoodEntity;
import com.movieticket.app.entity.SeatEntity;
import com.movieticket.app.entity.UserEntity;
import com.movieticket.app.service.IFoodService;
import com.movieticket.app.service.ISeatService;
import com.movieticket.app.service.IUserService;

@RestController
@RequestMapping
public class HomeAPI {
	@Autowired IUserService userService;
	@Autowired ISeatService seatService;
	@Autowired IFoodService foodService;

	@PostMapping("register")
	@ResponseStatus(HttpStatus.CREATED)
	UserEntity register(@RequestBody UserDTO userInfo) {
		userInfo.setRoleNames(null);
		return userService.create(userInfo);
	}
	
	@GetMapping("seat")
	List<SeatEntity> getSeatByRoomId(Long roomId, Long showtimeId){
		return seatService.findAllWithOccupied(roomId, showtimeId);
	}
	
	@GetMapping("food")
	List<FoodEntity> getAllFood(){
		return foodService.findAll();
	}
}
