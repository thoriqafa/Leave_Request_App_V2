package id.co.mii.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import groovyjarjarpicocli.CommandLine.Model;

@Controller
@RequestMapping("leave")
public class LeaveController {
    
    @GetMapping
    public String index(Model model){
        return "leave/index";
    }

    @GetMapping("/history")
    public String history(Model model){
        return "leave/leave-history";
    }
}
