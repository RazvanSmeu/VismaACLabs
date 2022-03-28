package com.doubletex.app.api.product;

import com.doubletex.app.exceptions.DoubletexNotFound;
import com.doubletex.app.util.Validations;
import com.doubletex.app.util.validation.Check;
import com.doubletex.app.util.validation.Validation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

/**
 * @author Alexandru Enache
 * @date 04.03.2022
 */

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public Validation validateCreate2(Product product) {
        log.debug(String.valueOf(product));
        return Validation.checkAll(
            Check.notNull(product.getName(), "name"),
            Check.notNull(product.getQuantity(), "price"),
            Check.notNull(product.getPrice(), "quantity"),
            Check.notEmpty(product.getName(), "name"),
            Check.positive(product.getPrice(), "price"),
            Check.positive(product.getQuantity(), "quantity")
        );
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
        validateCreate2(product).throwIfNecessary();
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
        return true;
    }
}
