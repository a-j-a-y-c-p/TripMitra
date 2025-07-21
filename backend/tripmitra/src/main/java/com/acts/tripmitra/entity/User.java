package com.acts.tripmitra.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(generator="increment")
    @Column(name = "userid")
    private Integer userId;

    @Column(name = "useremail", nullable = false, unique = true)
    private String userEmail;

    @Column(name = "username", nullable = false)
    private String userName;

    @Column(name = "userpassword", nullable = false)
    private String userPassword;

    @Column(name = "userrole", nullable = false)
    private String userRole;
}

