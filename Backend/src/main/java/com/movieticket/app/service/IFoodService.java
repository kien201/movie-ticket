package com.movieticket.app.service;

import java.io.IOException;
import java.util.List;

import com.movieticket.app.dto.FoodDTO;
import com.movieticket.app.dto.PageDTO;
import com.movieticket.app.dto.QueryFilter;
import com.movieticket.app.entity.FoodEntity;

public interface IFoodService {
	PageDTO<FoodEntity> findAll(QueryFilter filter);
	
	List<FoodEntity> findAll();
	
	FoodEntity findOne(Long id);
	
	FoodEntity create(FoodDTO foodInfo) throws IllegalStateException, IOException;
	
	FoodEntity update(Long id, FoodDTO foodInfo) throws IllegalStateException, IOException;
	
	int delete(Long[] ids);
}
