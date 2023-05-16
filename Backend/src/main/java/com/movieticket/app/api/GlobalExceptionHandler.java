package com.movieticket.app.api;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.movieticket.app.utils.ErrorMsgUtil;

@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(AccessDeniedException.class)
	@ResponseStatus(HttpStatus.FORBIDDEN)
	@ResponseBody
	public Map<String, Object> handleAccessDeniedException(HttpServletRequest req, Exception ex) {
		return ErrorMsgUtil.getError(req, ex, HttpStatus.FORBIDDEN.value());
	}

	@ExceptionHandler
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ResponseBody
	public Map<String, Object> handleException(HttpServletRequest req, Exception ex) {
		return ErrorMsgUtil.getError(req, ex, HttpStatus.BAD_REQUEST.value());
	}
}
