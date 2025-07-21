package com.acts.tripmitra.utilities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class MemberId {
	
	@Column(name="tripid")
	private int tripId;
	@Column(name="userid")
	private int userId;
}
