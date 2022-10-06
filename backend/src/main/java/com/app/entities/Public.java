package com.app.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import org.hibernate.validator.constraints.Length;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "public")
public class Public {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 250)
	private String homeVideoPath;
	
	@ElementCollection  // mandatory to specify that foll is collection of basic type
	@CollectionTable(name = "home_page_images", joinColumns = @JoinColumn(name="id"),uniqueConstraints = @UniqueConstraint(columnNames = {"id","home_image"}))
	@Column(name = "home_image",length = 300)
	private List<String> appointmentImage = new ArrayList<>();
}
