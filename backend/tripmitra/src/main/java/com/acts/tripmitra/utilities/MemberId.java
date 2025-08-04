package com.acts.tripmitra.utilities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class MemberId {
	
	@Column(name="tripid")
	private int tripId;
	@Column(name="userid")
	private int userId;
}
