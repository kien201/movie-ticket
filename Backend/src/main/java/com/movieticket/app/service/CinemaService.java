package com.movieticket.app.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.dto.CinemaDTO;
import com.movieticket.app.entity.CinemaEntity;
import com.movieticket.app.repository.CinemaRepository;

@Service
@Transactional
public class CinemaService {
	@Autowired CinemaRepository cinemaRepository;
	
	public List<CinemaEntity> findAll(){
		return cinemaRepository.findAll(Sort.by(Direction.DESC, "id"));
	}
	
	public CinemaEntity findOne(Long id) {
		return cinemaRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Không tìm thấy cinema"));
	}
	
	public CinemaEntity create(CinemaDTO cinemaInfo) {
		CinemaEntity cinema = new CinemaEntity();
		BeanUtils.copyProperties(cinemaInfo, cinema);
		return cinemaRepository.save(cinema);
	}
	
	public CinemaEntity update(Long id, CinemaDTO cinemaInfo) {
		CinemaEntity cinema = findOne(id);
		BeanUtils.copyProperties(cinemaInfo, cinema);
		return cinema;
	}
	
	public int delete(Long[] ids) {
		return cinemaRepository.deleteByIdIn(ids);
	}
}
