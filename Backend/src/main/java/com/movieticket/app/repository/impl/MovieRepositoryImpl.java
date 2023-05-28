package com.movieticket.app.repository.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.movieticket.app.entity.MovieEntity;
import com.movieticket.app.repository.MovieRepositotyCustom;

public class MovieRepositoryImpl implements MovieRepositotyCustom {
	@Autowired EntityManager em;
	
	public Page<MovieEntity> findBySearchValueContainsAndMovieTypeAndActiveTrue(String q, String movieType, Pageable pageable) {
		CriteriaBuilder builder = em.getCriteriaBuilder();
		CriteriaQuery<MovieEntity> query = builder.createQuery(MovieEntity.class);
		Root<MovieEntity> root = query.from(MovieEntity.class);
		
		List<Predicate> predicates = new ArrayList<>();
		predicates.add(builder.like(root.get("searchValue"), "%"+q+"%"));
		predicates.add(builder.equal(root.get("active"), true));
		if (movieType.equals("current")) {
			query.orderBy(builder.desc(root.get("premiere")));
			predicates.add(builder.lessThanOrEqualTo(root.get("premiere"), builder.currentDate()));
		} else {
			query.orderBy(builder.asc(root.get("premiere")));
			predicates.add(builder.greaterThan(root.get("premiere"), builder.currentDate()));
		}
		query.where(predicates.toArray(new Predicate[0]));
		
		List<MovieEntity> content = em.createQuery(query)
									  .setFirstResult((int)pageable.getOffset())
									  .setMaxResults(pageable.getPageSize())
									  .getResultList();
		
		CriteriaQuery<Long> countQuery = builder.createQuery(Long.class);
		countQuery.select(builder.count(countQuery.from(MovieEntity.class))).where(predicates.toArray(new Predicate[0]));
		long total = em.createQuery(countQuery).getSingleResult();
		
		return new PageImpl<>(content, pageable, total);
	}

}
