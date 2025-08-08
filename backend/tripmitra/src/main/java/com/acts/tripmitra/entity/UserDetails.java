package com.acts.tripmitra.entity;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "userdetails")
@Data
public class UserDetails {

    @Id
    @Column(name = "userdetailsid")
    @GeneratedValue(generator = "increment")
    private Integer userDetailsId;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "userid", referencedColumnName = "userid")
    @JsonManagedReference
    private User user;

    @Column(name = "phonenumber")
    private String phoneNumber;
    
    @Column(name = "alterphone")
    private String alterPhone;

    @Column(name = "gender")
    private String gender;
    
    @Column(name = "dateofbirth")
    private Date dateOfBirth;
    
//    @Column(name = "imageurl")
//    private String imageUrl;
    
    @Lob
    @Column(name = "imageurl", columnDefinition = "LONGBLOB")
    private byte[] imageUrl;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "addressid", referencedColumnName = "addressid")
    @JsonManagedReference
    private Address address;
    
    @Column(name = "isblocked")
    private boolean isBlocked;
}

