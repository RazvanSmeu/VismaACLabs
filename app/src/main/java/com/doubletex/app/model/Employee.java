package com.doubletex.app.model;

import lombok.*;

import javax.persistence.*;

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
    private String name;
}
