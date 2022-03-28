package com.doubletex.app.api.employee;

import com.doubletex.app.api.company.Company;
import com.doubletex.app.api.BaseEntity;
import com.doubletex.app.util.IdProxySerializer;
import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validation;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Date;

/**
 * @author Alexandru Enache
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Employee extends BaseEntity {
    @NotNull
    @NotEmpty
    private String firstName = "";

    private String lastName = "";

    @Past
    private Date birthdate = new Date();

    @Email
    private String email = "";

    private String jobTitle = "";

    @PositiveOrZero
    private double monthlySalary = 0;

    @PositiveOrZero
    private int monthlyHourQuota = 0;

    private boolean isAdmin = false;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonSerialize(using = IdProxySerializer.class)
    private Company company = null;

    private String userName = "";
}
