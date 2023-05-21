package com.movieticket.app.service;

import java.util.List;

import com.movieticket.app.dto.Paging;
import com.movieticket.app.dto.ResultWithPaging;
import com.movieticket.app.dto.UserDTO;
import com.movieticket.app.entity.UserEntity;

public interface IUserService {
	ResultWithPaging<UserEntity> findAll(Paging paging);
	
	List<UserEntity> findAll();
	
	UserEntity findOne(Long id);
	
	UserEntity findByUsername(String username);
	
	UserEntity create(UserDTO userInfo);
	
	UserEntity update(Long id, UserDTO userInfo);
	
	int changePassword(Long id, String newPassword);
	
	int delete(Long[] ids);

	void updateRoles(UserEntity user, List<String> roleNames);
}
