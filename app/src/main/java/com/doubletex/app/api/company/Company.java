package com.doubletex.app.api.company;

import com.doubletex.app.api.employee.Employee;
import com.doubletex.app.util.BaseEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Company extends BaseEntity {
    private String name;

    @OneToMany
    private List<Employee> employees;
}
