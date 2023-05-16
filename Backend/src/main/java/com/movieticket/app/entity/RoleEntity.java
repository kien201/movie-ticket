package com.movieticket.app.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "role")
@Getter @Setter
public class RoleEntity extends BaseEntity {
	
	private String name;
	
	private String description;
	
	@ManyToMany(mappedBy = "roles")
	@JsonIgnore
	private Set<UserEntity> users = new HashSet<>();
}
