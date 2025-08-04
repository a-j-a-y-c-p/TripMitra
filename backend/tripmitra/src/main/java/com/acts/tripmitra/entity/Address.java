package com.acts.tripmitra.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "address")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Id
	@GeneratedValue(generator="increment")
    @Column(name = "addressid")
    private Integer addressId;

    @Column(name = "district")
    private String district;

    @Column(name = "state")
    private String state;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "addressline1")
    private String addressLine1;

    @Column(name = "addressline2")
    private String addressLine2;
    
    @OneToOne(mappedBy = "address")
	@JsonBackReference
	UserDetails userDetails;
}
