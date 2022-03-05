package com.doubletex.app.api.company;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.product.Product;
import com.doubletex.app.util.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Company extends BaseEntity {
    private String name;
    private long ownerId;

    @OneToMany
    private List<Employee> employees;

    @OneToMany
    private List<Product> products;
}
