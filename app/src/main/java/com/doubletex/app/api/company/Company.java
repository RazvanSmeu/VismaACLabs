package com.doubletex.app.api.company;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.api.product.Product;
import com.doubletex.app.api.BaseEntity;
import com.doubletex.app.util.IdProxySerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Company extends BaseEntity {
    private String name;

    @OneToOne
    @JsonSerialize(using = IdProxySerializer.class)
    private Employee admin;

    @OneToMany
    @JsonSerialize(using = IdProxySerializer.class)
    private List<Employee> employees;

    @OneToMany
    @JsonSerialize(using = IdProxySerializer.class)
    private List<Product> products;
}
