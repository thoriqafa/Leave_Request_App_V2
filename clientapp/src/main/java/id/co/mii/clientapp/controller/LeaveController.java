package id.co.mii.clientapp.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import groovyjarjarpicocli.CommandLine.Model;

@Controller
@RequestMapping("leave")
@PreAuthorize("hasAnyRole('manager','employee')")
public class LeaveController {
    
    @GetMapping
    public String index(Model model){
        return "leave/index";
    }

    @GetMapping("/history")
    @PreAuthorize("hasAnyRole('manager','employee')")
    public String history(Model model){
        return "leave/leave-history";
    }

    @GetMapping("/approval")
    @PreAuthorize("hasRole('manager')")
    public String approval(Model model){
        return "leave/leave-approval";
    }
    
    @GetMapping("/myrequest")
    @PreAuthorize("hasAnyRole('manager','employee')")
    public String myRequest(Model model){
        return "leave/leave-edit";
    }

    @GetMapping("/balance")
    @PreAuthorize("hasAnyRole('employee','manager')")
    public String balance(Model model){
        return "leave/leave-balance";
    }
}
