package id.co.mii.clientapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import id.co.mii.clientapp.service.DepartmentService;
import lombok.AllArgsConstructor;

@Controller
@RequestMapping("/department")
@AllArgsConstructor
public class DepartmentController {
    
    private DepartmentService departmentService;

    @GetMapping
    public String index(Model model){
        model.addAttribute("departements", departmentService.getAll());
        return "depart/index";
    }

    @GetMapping("update")
    public String updateForm(Model model){
        return "depart/update-department";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){

        return "redirect:/department";
    }
}