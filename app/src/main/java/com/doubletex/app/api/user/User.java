package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.util.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
public class User extends BaseEntity {
    @Column(unique = true)
    private String userName;
    private String passwordHash;
    private String salt;
    private String latestToken;

    @OneToOne(fetch = FetchType.LAZY)
    private Employee employee;
}
