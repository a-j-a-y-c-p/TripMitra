package com.acts.tripmitra.entity;

import com.acts.tripmitra.utilities.MemberId;
import com.acts.tripmitra.utilities.Status;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="tripmembers")
public class TripMember {
	
	@EmbeddedId
	private MemberId memberId;
	@Column(name="status")
	@Enumerated(EnumType.STRING)
	private Status status;
	@Column(name="istriphost")
	private boolean isTripHost;
}
