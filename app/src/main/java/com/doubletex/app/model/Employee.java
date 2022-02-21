package com.doubletex.app.model;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

/**
 * @author Alexandru Enache
 * @date 14.02.2022
 */

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String email;
    private String jobTitle;
    private double monthlySalary;
    private int monthlyHourQuota;
    private Date birthdate;
}
