package id.co.mii.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("leave-type")
public class LeaveTypeController {
    
    @GetMapping
    public String index(Model model){
        return "leave-type/index";
    }

    @GetMapping("update")
    public String updateForm(Model model) {
        return "leave-type/update-leave-type";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){

        return "redirect:/leave-type";
    }
}
