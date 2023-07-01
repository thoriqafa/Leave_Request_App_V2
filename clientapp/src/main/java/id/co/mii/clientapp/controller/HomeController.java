package id.co.mii.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/home")
@AllArgsConstructor
public class HomeController {
    
    @GetMapping
    public String homePage(){
        return "home/index";
    }

}
