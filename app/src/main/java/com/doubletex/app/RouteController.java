package com.doubletex.app;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author Alexandru Enache
 * @date 16.02.2022
 */

@Controller
@RequestMapping("/")
public class RouteController {

//    @GetMapping(value = "/")
    @GetMapping(value = "/{path:[^\\.]*}")
    public String redirectWithUsingForwardPrefix(ModelMap model) {
        return "forward:/index.html";
    }
}
