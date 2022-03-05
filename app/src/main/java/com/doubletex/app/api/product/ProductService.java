package com.doubletex.app.api.product;

/**
 * @author Alexandru Enache
 * @date 04.03.2022
 */

public interface ProductService {

    Product findById(Long id);

    Product update(Product product);

    Product restock(Long id, Integer quantity);
}
