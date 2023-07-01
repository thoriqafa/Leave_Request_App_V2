package id.co.mii.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping("user")
public class UserController {
    
    @GetMapping
    public String index(Model model){
        return "user/index";
    }

    @GetMapping("update")
    public String updateForm(Model model){
        return "user/update-user";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){

        return "redirect:/user";
    }
}
