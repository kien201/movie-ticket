package com.movieticket.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.dto.SeatDTO;
import com.movieticket.app.entity.SeatEntity;
import com.movieticket.app.repository.RoomRepository;
import com.movieticket.app.repository.SeatRepository;
import com.movieticket.app.repository.SeatTypeRepository;

@Service
@Transactional
public class SeatService {
	@Autowired RoomRepository roomRepository;
	@Autowired SeatRepository seatRepository;
	@Autowired SeatTypeRepository seatTypeRepository;
	
	public List<SeatEntity> findAll(){
		return seatRepository.findAll(Sort.by(Direction.DESC, "id"));
	}
	
	public SeatEntity findOne(Long id) {
		return seatRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Không tìm thấy ghế"));
	}
	
	public SeatEntity create(SeatDTO seatInfo) {
		SeatEntity seat = new SeatEntity();
		BeanUtils.copyProperties(seatInfo, seat);
		seat.setRoom(roomRepository.findById(seatInfo.getRoomId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy phòng")));
		seat.setType(seatTypeRepository.findById(seatInfo.getTypeId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy loại ghế")));
		return seatRepository.save(seat);
	}
	
	public SeatEntity update(Long id, SeatDTO seatInfo) {
		SeatEntity seat = findOne(id);
		BeanUtils.copyProperties(seatInfo, seat);
		seat.setRoom(roomRepository.findById(seatInfo.getRoomId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy phòng")));
		seat.setType(seatTypeRepository.findById(seatInfo.getTypeId()).orElseThrow(()-> new NoSuchElementException("Không tìm thấy loại ghế")));
		return seat;
	}
	
	public int delete(Long[] ids) {
		return seatRepository.deleteByIdIn(ids);
	}
}
