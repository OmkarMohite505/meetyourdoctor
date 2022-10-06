package com.app.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.app.enums.RoleEnum;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "roles")
@Getter
@Setter
@ToString
@EqualsAndHashCode(callSuper = false)
@NoArgsConstructor
public class RoleEntity extends BaseEntity {

	@Enumerated(EnumType.STRING)
	@Column(length = 20,unique = true)
	private RoleEnum roleName;

	public RoleEntity(RoleEnum roleName) {
		super();
		this.roleName = roleName;
	}
	
}
