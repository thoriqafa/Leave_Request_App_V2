package id.co.mii.serverapp.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.serverapp.models.Department;
import id.co.mii.serverapp.services.DepartmentService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/department")
public class DepartmentController {
    private DepartmentService departmentService;

    @GetMapping
    public List<Department> getAll(){
        return departmentService.getAll();
    }

    @GetMapping("/{id}")
    public Department getById(@PathVariable Long id) {
        return departmentService.getById(id);
    }

    @PostMapping
    public Department create(@RequestBody Department department){
        return departmentService.create(department);    
    }

    @PutMapping("/{id}")
    public Department update(@PathVariable Long id, @RequestBody Department department){
        return departmentService.update(id, department);
    }

    @DeleteMapping("/{id}")
    public Department delete(@PathVariable Long id){
        return departmentService.delete(id);
    }
}
