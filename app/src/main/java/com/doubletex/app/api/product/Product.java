package com.doubletex.app.api.product;

import com.doubletex.app.api.BaseEntity;
import com.doubletex.app.api.company.Company;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import java.math.BigDecimal;

/**
 * @author Alexandru Enache
 * @date 04.03.2022
 */

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Product extends BaseEntity {

    private String name;

    private BigDecimal price;

    private Integer quantity;

    @ManyToOne
    private Company company;

    @Override
    public String toString() {
        return "Product{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", quantity=" + quantity +
                ", company=" + company +
                '}';
    }
}
