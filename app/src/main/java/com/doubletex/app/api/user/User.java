package com.doubletex.app.api.user;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.BaseEntity;
import com.doubletex.app.util.IdProxySerializer;
import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validation;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;

@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
@Entity
@Getter
@Setter
public class User extends BaseEntity {
    @Column(unique = true)
    @Pattern(regexp = "\\w+", message = "Must be a word with no spaces")
    private String userName;
    private String passwordHash;
    private String salt;
    private String latestToken;
    private boolean isTokenFrozen;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonSerialize(using = IdProxySerializer.class)
    @JsonManagedReference
    @Valid
    private Employee employee;

    public void setLatestToken(String latestToken) {
        if(!this.isTokenFrozen) {
            this.latestToken = latestToken;
        }
    }

    public Validation validateNotLinked() {
        return Validation.checkAll(
            Check.that(
                getEmployee() == null,
                "employee",
                "User must not be linked to any employee"
            )
        );
    }
}
