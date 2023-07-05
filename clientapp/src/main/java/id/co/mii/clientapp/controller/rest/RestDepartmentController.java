package id.co.mii.clientapp.controller.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.model.Department;
import id.co.mii.clientapp.service.DepartmentService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/department")
@AllArgsConstructor
public class RestDepartmentController {
    
    private DepartmentService departmentService;

    @GetMapping
    public List<Department> getAll(){
        return departmentService.getAll();
    }
}
