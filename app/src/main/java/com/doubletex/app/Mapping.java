package com.doubletex.app;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Alexandru Enache
 * @date 16.02.2022
 */

@Controller
public class Mapping {

    @RequestMapping("/")
    public String get() {
        return "index";
    }
}
