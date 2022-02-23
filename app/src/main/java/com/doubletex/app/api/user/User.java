package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.util.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToOne;

@Entity
@Getter
@Setter
public class User extends BaseEntity {
    private String latestToken;
    private String userName;
    private String passwordHash;
    private String salt;

    @OneToOne(fetch = FetchType.LAZY)
    private Employee employee;
}
