package com.doubletex.app.api.product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 * @author Alexandru Enache
 * @date 04.03.2022
 */

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Modifying
    @Query("UPDATE Product p " +
            "SET p.quantity = ?2 " +
            "WHERE p.id = ?1")
    Product updateProductQuantityById(Long id, Integer quantity);

}
