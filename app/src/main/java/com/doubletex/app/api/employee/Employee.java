package com.doubletex.app.api.employee;

import com.doubletex.app.api.company.Company;
import com.doubletex.app.api.BaseEntity;
import com.doubletex.app.api.user.User;
import com.doubletex.app.util.IdProxySerializer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Alexandru Enache
 */

@Entity@Getter@Setter
@NoArgsConstructor
public class Employee extends BaseEntity {
    private String firstName = "";
    private String lastName = "";
    private Date birthdate = new Date();
    private String phoneNumber = "";
    private String email = "";
    private String jobTitle = "";
    private double monthlySalary = 0;
    private int monthlyHourQuota = 0;
    private boolean isAdmin = false;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonSerialize(using = IdProxySerializer.class)
    private Company company = null;

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonSerialize(using = IdProxySerializer.class)
    @JsonBackReference
    private User user = null;
}
