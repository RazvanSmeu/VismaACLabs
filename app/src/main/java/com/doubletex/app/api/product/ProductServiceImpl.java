package com.doubletex.app.api.product;

import org.springframework.stereotype.Service;

/**
 * @author Alexandru Enache
 * @date 04.03.2022
 */

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow();
    }

    @Override
    public Product update(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product restock(Long id, Integer quantity) {
        return productRepository.updateProductQuantityById(id, quantity);
    }
}
