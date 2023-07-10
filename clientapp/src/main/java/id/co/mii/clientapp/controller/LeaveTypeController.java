package id.co.mii.clientapp.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/leavetype")
public class LeaveTypeController {
    
    @GetMapping
    public String index(Model model){
        return "leavetype/index";
    }

    @GetMapping("update")
    public String updateForm(Model model) {
        return "leavetype/update-leavetype";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){

        return "redirect:/leave-type";
    }
}
