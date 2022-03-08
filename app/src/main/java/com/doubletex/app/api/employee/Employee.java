package com.doubletex.app.api.employee;

import com.doubletex.app.api.company.Company;
import com.doubletex.app.util.BaseEntity;
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

    @ManyToOne
    private Company company = null;
}
