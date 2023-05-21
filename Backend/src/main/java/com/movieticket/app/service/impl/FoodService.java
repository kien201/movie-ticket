package com.movieticket.app.service.impl;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.constants.Common;
import com.movieticket.app.dto.FoodDTO;
import com.movieticket.app.dto.Paging;
import com.movieticket.app.dto.ResultWithPaging;
import com.movieticket.app.entity.FoodEntity;
import com.movieticket.app.repository.FoodRepository;
import com.movieticket.app.service.IFoodService;
import com.movieticket.app.utils.UploadUtil;

@Service
@Transactional
public class FoodService implements IFoodService {
	@Autowired FoodRepository foodRepository;
	
	public ResultWithPaging<FoodEntity> findAll(Paging paging){
		ResultWithPaging<FoodEntity> rs = new ResultWithPaging<>();
		Page<FoodEntity> page = foodRepository.findAll(PageRequest.of(paging.getPage()-1, paging.getSize(), paging.getDirection(), paging.getProperty()));
		rs.setResult(page.getContent());
		paging.setTotalItems(page.getTotalElements());
		paging.setTotalPages(page.getTotalPages());
		rs.setPaging(paging);
		return rs;
	}
	
	public List<FoodEntity> findAll(){
		return foodRepository.findAll(Sort.by(Direction.DESC, "id"));
	}
	
	public FoodEntity findOne(Long id) {
		return foodRepository.findById(id).orElseThrow(()-> new NoSuchElementException("Không tìm thấy đồ ăn"));
	}
	
	public FoodEntity create(FoodDTO foodInfo) throws IllegalStateException, IOException {
		FoodEntity food = new FoodEntity();
		BeanUtils.copyProperties(foodInfo, food);
		if (foodInfo.getThumbnailFile() != null && !foodInfo.getThumbnailFile().isEmpty()) {
			String filename = UploadUtil.store(foodInfo.getThumbnailFile(), Common.UPLOAD_DIR);
			food.setThumbnail(filename);
		} else food.setThumbnail(Common.DEFAULT_IMAGE_NAME);
		return foodRepository.save(food);
	}
	
	public FoodEntity update(Long id, FoodDTO foodInfo) throws IllegalStateException, IOException {
		FoodEntity food = findOne(id);
		BeanUtils.copyProperties(foodInfo, food);
		if (foodInfo.getThumbnailFile() != null && !foodInfo.getThumbnailFile().isEmpty()) {
			String filename = UploadUtil.store(foodInfo.getThumbnailFile(), Common.UPLOAD_DIR);
			food.setThumbnail(filename);
		}
		if (food.getThumbnail() == null) food.setThumbnail(Common.DEFAULT_IMAGE_NAME);
		return food;
	}
	
	public int delete(Long[] ids) {
		return foodRepository.deleteByIdIn(ids);
	}
}
