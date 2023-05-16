package com.movieticket.app.service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.dto.Paging;
import com.movieticket.app.dto.ResultWithPaging;
import com.movieticket.app.dto.UserDTO;
import com.movieticket.app.entity.RoleEntity;
import com.movieticket.app.entity.UserEntity;
import com.movieticket.app.repository.RoleRepository;
import com.movieticket.app.repository.UserRepository;

@Service
@Transactional
public class UserService {
	@Autowired PasswordEncoder passwordEncoder;
	@Autowired UserRepository userRepository;
	@Autowired RoleRepository roleRepository;

	public ResultWithPaging<UserEntity> findAll(String type, Paging paging){
		ResultWithPaging<UserEntity> rs = new ResultWithPaging<>();
		switch(type) {
			case "page":
				Page<UserEntity> page = userRepository.findAll(PageRequest.of(paging.getPage()-1, paging.getSize(), paging.getDirection(), paging.getProperty()));
				rs.setResult(page.getContent());
				paging.setTotalItems(page.getTotalElements());
				paging.setTotalPages(page.getTotalPages());
				rs.setPaging(paging);
				break;
			case "all":
				List<UserEntity> users = userRepository.findAll(Sort.by(paging.getDirection(), paging.getProperty()));
				rs.setResult(users);
				break;
		}
		return rs;
	}
	
	public UserEntity findOne(Long id) {
		return userRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Không tìm thấy người dùng"));
	}
	
	public UserEntity findByUsername(String username) {
		return userRepository.findByUsername(username).orElseThrow(()-> new NoSuchElementException("Không tìm thấy người dùng"));
	}
	
	public UserEntity create(UserDTO userInfo) {
		userRepository.findByUsername(userInfo.getUsername())
					.ifPresent(x-> { throw new IllegalArgumentException("Tài khoản đã tồn tại!"); });
		
		UserEntity user = new UserEntity();
		BeanUtils.copyProperties(userInfo, user, "password");
		user.setPassword(passwordEncoder.encode(userInfo.getPassword()));
		updateRoles(user, userInfo.getRoleNames());
		return userRepository.save(user);
	}
	
	public UserEntity update(Long id, UserDTO userInfo) {
		UserEntity user = findOne(id);
		BeanUtils.copyProperties(userInfo, user, "password","username");
		updateRoles(user, userInfo.getRoleNames());
		return user;
	}
	
	public int changePassword(Long id, String newPassword) {
		return userRepository.updatePasswordById(id, passwordEncoder.encode(newPassword));
	}
	
	public int delete(Long[] ids) {
		return userRepository.deleteByIdIn(ids);
	}

	public void updateRoles(UserEntity user, List<String> roleNames) {
		if (roleNames == null) return;
		Set<RoleEntity> roles = roleNames.stream()
				.map(name -> roleRepository.findByName(name).orElseThrow(()-> new NoSuchElementException("Cant find role with name " + name)))
				.collect(Collectors.toSet());
		user.getRoles().clear();
		user.getRoles().addAll(roles);
	}
}
