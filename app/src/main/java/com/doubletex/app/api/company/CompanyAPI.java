package com.doubletex.app.api.company;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/company")
public class CompanyAPI {
    private final CompanyService companyService;

    public CompanyAPI(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/create")
    public Company createCompany(@RequestParam String name) {
        return companyService.create(name);
    }
}
