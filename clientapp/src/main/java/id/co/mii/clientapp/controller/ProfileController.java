package id.co.mii.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("profile")
public class ProfileController {
    
    @GetMapping
    public String index(Model model){
        return "profile/index";
    }

    @GetMapping("/update")
    public String updateForm(Model model){
        return "profile/update-profile";
    }
}