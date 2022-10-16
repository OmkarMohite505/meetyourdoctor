package com.app.entities;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import ch.qos.logback.classic.db.names.ColumnName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name="doctor_addresses")
public class Address  {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "adr_id")
	private Long addressId;
	
	@Column(length = 50)
	private String town;
	
	@Column(length = 30)
	private String city;
	
	@Column(length = 30)
	private String state;
	
	@Column(length = 30)
	private String country;
	
	private int pincode;
	
}
