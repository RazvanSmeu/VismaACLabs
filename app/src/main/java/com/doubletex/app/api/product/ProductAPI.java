package com.doubletex.app.api.product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * @author Alexandru Enache
 * @date 04.03.2022
 */

@RestController
@RequestMapping("api/product")
public class ProductAPI {

    private final ProductService productService;

    @Autowired
    public ProductAPI(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PutMapping()
    public Product update(@RequestBody Product product) {
        return productService.update(product);
    }

    @PutMapping("/restock/{id}")
    public Product restock(@PathVariable Long id, @RequestParam Integer quantity) {
        return productService.restock(id, quantity);
    }

//    @PostMapping()
//    public Product create() {

//    }
}
