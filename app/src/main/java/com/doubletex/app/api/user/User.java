package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.BaseEntity;
import com.doubletex.app.util.IdProxySerializer;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
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

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonSerialize(using = IdProxySerializer.class)
    @JsonManagedReference
    private Employee employee;

    public void setLatestToken(String latestToken) {
        if(!this.isTokenFrozen) {
            this.latestToken = latestToken;
        }
    }
}
