package com.movieticket.app.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ResultWithPaging<T> {
	List<T> result;
	Paging paging;
}
