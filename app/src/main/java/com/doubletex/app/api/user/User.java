package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.BaseEntity;
import com.doubletex.app.util.IdProxySerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
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
    private boolean isTokenFrozen;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonSerialize(using = IdProxySerializer.class)
    private Employee employee;

    public void setLatestToken(String latestToken) {
        if(!this.isTokenFrozen) {
            this.latestToken = latestToken;
        }
    }
}
