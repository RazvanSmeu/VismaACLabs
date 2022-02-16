package com.doubletex.app;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

/**
 * @author Alexandru Enache
 * @date 16.02.2022
 */

@Controller
@RequestMapping("/")
public class RouteController {

//    @GetMapping(value = "/page/{path:[^\\.]*}")
    @GetMapping(value = "/page")
    public String index() {
        return "forward:/index.html";
    }


    @GetMapping(value = "/")
    public ModelAndView redirectWithUsingForwardPrefix(ModelMap model) {
        return new ModelAndView("redirect:/page", model);
    }
}
