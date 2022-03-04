package com.doubletex.app.util;

import lombok.*;

import javax.persistence.*;

/**
 * @author Alexandru Enache
 * @date 21.02.2022
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    @With
    private Long id;
    private boolean isInitialized;
}
