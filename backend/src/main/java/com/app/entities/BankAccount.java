package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "bank_accounts")
public class BankAccount {
	@Id
	@Column(name = "bank_acct_id")
	private Long bankId;
	
	@Column(length = 15)
	private String panCardNo;
	
	@Column(length = 50)
	private String nameAsPerBank;
	
	@Column(length = 50)
	private String bankName;
	
	@Column(length = 25)
	private String bankAccountNo;
	
	@Column(length = 20)
	@JsonProperty("IFSC_Code") 
	private String IFSCcode;
	
	@OneToOne
	@MapsId
	@JoinColumn(name = "bank_acct_id")
	private Doctor doctor;

}
