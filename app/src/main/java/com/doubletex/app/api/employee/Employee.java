package com.doubletex.app.api.employee;

import com.doubletex.app.model.BaseEntity;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Alexandru Enache
 */

@Entity@Getter@Setter
public class Employee extends BaseEntity {
    private String firstName;
    private String lastName;
    private Date birthdate;
    private String phoneNumber;
    private String email;
    private String jobTitle;
    private double monthlySalary;
    private int monthlyHourQuota;
}
