package com.movieticket.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.dto.ShowtimeDTO;
import com.movieticket.app.entity.ShowtimeEntity;
import com.movieticket.app.repository.MovieRepository;
import com.movieticket.app.repository.RoomRepository;
import com.movieticket.app.repository.ShowtimeRepository;

@Service
@Transactional
public class ShowtimeService {
	@Autowired ShowtimeRepository showtimeRepository;
	@Autowired RoomRepository roomRepository;
	@Autowired MovieRepository movieRepository;
	
	public List<ShowtimeEntity> findAll(){
		return showtimeRepository.findAll(Sort.by(Direction.DESC, "id"));
	}
	
	public ShowtimeEntity findOne(Long id) {
		return showtimeRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Không tìm thấy lịch chiếu"));
	}
	
	public ShowtimeEntity create(ShowtimeDTO showtimeInfo) {
		ShowtimeEntity showtime = new ShowtimeEntity();
		BeanUtils.copyProperties(showtimeInfo, showtime);
		showtime.setRoom(roomRepository.findById(showtimeInfo.getRoomId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy phòng")));
		showtime.setMovie(movieRepository.findById(showtimeInfo.getMovieId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy phim")));
		return showtimeRepository.save(showtime);
	}
	
	public ShowtimeEntity update(Long id, ShowtimeDTO showtimeInfo) {
		ShowtimeEntity showtime = findOne(id);
		BeanUtils.copyProperties(showtimeInfo, showtime);
		showtime.setRoom(roomRepository.findById(showtimeInfo.getRoomId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy phòng")));
		showtime.setMovie(movieRepository.findById(showtimeInfo.getMovieId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy phim")));
		return showtime;
	}
	
	public int delete(Long[] ids) {
		return showtimeRepository.deleteByIdIn(ids);
	}
}
