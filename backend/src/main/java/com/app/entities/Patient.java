package com.app.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

import org.springframework.format.annotation.DateTimeFormat;

import com.app.enums.GenderType;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patients")
public class Patient extends Person{
	// Patient has hobbies
	@ElementCollection // mandatory to specify that foll is collection of
	@CollectionTable(name = "patient_hobbies", joinColumns = @JoinColumn(name = "patient_id"), uniqueConstraints = @UniqueConstraint(columnNames = {
			"patient_id", "hobby" }))
	@Column(name = "hobby", length = 40)
	private List<String> hobbies = new ArrayList<>();

	@OneToOne
	@JoinColumn(name = "login_id")
	private Login login;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
	@JoinColumn(name = "patient_id")
	private Set<PatientAddress> address;

}
