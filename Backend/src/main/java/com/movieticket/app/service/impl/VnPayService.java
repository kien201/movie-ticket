package com.movieticket.app.service.impl;

import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.movieticket.app.config.VnPayConfig;
import com.movieticket.app.constants.TicketStatus;
import com.movieticket.app.entity.TicketEntity;
import com.movieticket.app.repository.TicketRepository;
import com.movieticket.app.service.IPaymentService;

@Service
@Transactional
public class VnPayService implements IPaymentService {
	@Autowired
	TicketRepository ticketRepository;
	
	public String getPaymentURL(HttpServletRequest req, Long ticketId, long totalPrice) throws UnsupportedEncodingException {
		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", VnPayConfig.vnp_Version);
		vnp_Params.put("vnp_Command", VnPayConfig.vnp_Command);
		vnp_Params.put("vnp_TmnCode", VnPayConfig.vnp_TmnCode);
		vnp_Params.put("vnp_Amount", String.valueOf(totalPrice*100));
		vnp_Params.put("vnp_CurrCode", VnPayConfig.vnp_CurrCode);
	    vnp_Params.put("vnp_Locale", VnPayConfig.vnp_Locale);
		vnp_Params.put("vnp_ReturnUrl", VnPayConfig.vnp_Returnurl);
		vnp_Params.put("vnp_IpAddr", VnPayConfig.getIpAddress(req));
		
		String vnp_TxnRef = ticketId.toString();
		vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
		vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang: #" + vnp_TxnRef);
		Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
		vnp_Params.put("vnp_CreateDate", formatter.format(cld.getTime()));
		cld.add(Calendar.MINUTE, 15);
		vnp_Params.put("vnp_ExpireDate", formatter.format(cld.getTime()));
		
		String queryUrl = VnPayConfig.getQueryUrl(vnp_Params);
		String vnp_SecureHash = VnPayConfig.hmacSHA512(VnPayConfig.vnp_HashSecret, queryUrl);
		queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
		String paymentUrl = VnPayConfig.vnp_PayUrl + "?" + queryUrl;
		return paymentUrl;
	}
	
	public Map<String, String> paymentSuccess(HttpServletRequest req) throws UnsupportedEncodingException {
		Map<String, String> fields = new HashMap<>();
		Enumeration<String> params = req.getParameterNames();
		while (params.hasMoreElements()) {
		    String fieldName = params.nextElement();
		    String fieldValue = req.getParameter(fieldName);
		    if ((fieldValue != null) && (fieldValue.length() > 0))
		    	fields.put(fieldName, fieldValue);
		}
		String vnp_SecureHash = req.getParameter("vnp_SecureHash");
		if (fields.containsKey("vnp_SecureHashType")) fields.remove("vnp_SecureHashType");
		if (fields.containsKey("vnp_SecureHash")) fields.remove("vnp_SecureHash");
		String signValue = VnPayConfig.hashAllFields(fields);

		Map<String, String> res = new HashMap<>();
		Long ticketId = Long.valueOf(req.getParameter("vnp_TxnRef"));
		
		if (signValue.equals(vnp_SecureHash)) {
			TicketEntity ticket = ticketRepository.findById(ticketId).orElseThrow(()->new NoSuchElementException("Không tìm thấy vé"));
			ticket.setActive(true);
		    if (req.getParameter("vnp_ResponseCode").equals("00")) {
//		    	Move to IPN when have SSL(https)
		    	ticket.setStatus(TicketStatus.PAYMENT_SUCCESS);
				res.put("code", "00");
				res.put("message", "Thanh toán thành công");
		    } else {
		    	ticket.setStatus(TicketStatus.PAYMENT_FAILED);
				res.put("code", "99");
				res.put("message", "Thanh toán thất bại");
		    }
		} else {
			res.put("code", "99");
			res.put("message", "Thông tin không hợp lệ");
		}
		return res;
	}
}
