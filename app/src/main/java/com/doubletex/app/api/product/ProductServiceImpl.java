package com.doubletex.app.api.product;

import com.doubletex.app.exceptions.DoubletexNotFound;
import com.doubletex.app.util.Validations;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * @author Alexandru Enache
 * @date 04.03.2022
 */

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public static void validateCreate(Product product) {
        log.debug(String.valueOf(product));
        if (product.getName().isEmpty()) {
            Validations.addToValidationsList("name", "Name cannot be empty");
        }
        if (product.getQuantity() == null || product.getQuantity().compareTo(0) <= 0) {
            Validations.addToValidationsList("quantity", "Quantity should be greater then 0");
        }
        if (product.getPrice() == null || product.getPrice().compareTo(BigDecimal.ZERO) < 0) {
            Validations.addToValidationsList("price", "Price should be greater then 0");
        }
    }

    @Override
    public Product findById(Long id) {
        return productRepository.findById(id).orElseThrow(() -> new DoubletexNotFound("No entity with id: " + id));
    }

    @Override
    public Product save(Product product) {
        validateCreate(product);
        Validations.throwValidationException();
        return productRepository.save(product);
    }

    @Override
    public Product restock(Long id, Integer quantity) {
        return productRepository.updateProductQuantityById(id, quantity);
    }

    @Override
    public Boolean delete(Long id) {
        productRepository.deleteById(id);
        return Boolean.TRUE;
    }
}
