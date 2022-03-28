package com.doubletex.app.api.company;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/company")
@RequiredArgsConstructor
public class CompanyAPI {
    private final CompanyService companyService;

    @PostMapping("/create")
    public Company createCompany(@RequestParam String name) {
        return companyService.create(name);
    }
}
