package id.co.mii.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.clientapp.model.dto.request.LoginRequest;
import id.co.mii.clientapp.service.LoginService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/login")
@AllArgsConstructor
public class AuthController {
    
    private LoginService loginService;

    @GetMapping
    public String loginPage(LoginRequest loginRequest){
        return "auth/login";
    }

    @PostMapping
    public String login(LoginRequest loginRequest){
        if (!loginService.login(loginRequest)){
            // System.out.println("test");
            return "redirect:/login?error=true";
        }
        return "redirect:/home/";
    }   
}
