//package com.movieticket.app.config;
//
//import java.io.File;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.List;
//
//import javax.servlet.ServletContext;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//import org.springframework.util.ResourceUtils;
//
//import com.movieticket.app.repository.MovieRepository;
//import com.movieticket.app.repository.RoleRepository;
//import com.movieticket.app.service.impl.UserService;
//
//@Component
//public class InsertDB implements CommandLineRunner {
//	@Autowired RoleRepository roleRepository;
//	@Autowired UserService userService;
//	@Autowired MovieRepository movie;
//
//	@Override
//	public void run(String... args) throws Exception {
//		List<RoleEntity> roleEntities = new ArrayList<>();
//		roleEntities.add(new RoleEntity(RoleName.SHOW_ADMIN, "Xem trang quản trị"));
//		roleEntities.add(new RoleEntity(RoleName.MANAGE_CINEMA, "Cập nhật rạp, phòng và chỗ ngồi"));
//		roleEntities.add(new RoleEntity(RoleName.MANAGE_FOOD, "Cập nhật đồ ăn"));
//		roleEntities.add(new RoleEntity(RoleName.MANAGE_MOVIE, "Cập nhật movie"));
//		roleEntities.add(new RoleEntity(RoleName.MANAGE_SHOWTIME, "Cập nhật lịch chiếu"));
//		roleEntities.add(new RoleEntity(RoleName.MANAGE_USER, "Cập nhật người dùng"));
//		roleRepository.saveAll(roleEntities);
//		UserDTO u = new UserDTO();
//		u.setUsername("admin");
//		u.setPassword("admin");
//		u.setRoleNames(Arrays.asList(RoleName.SHOW_ADMIN, RoleName.MANAGE_USER));
//		UserEntity user = userService.create(u);
//	}
//
//}
