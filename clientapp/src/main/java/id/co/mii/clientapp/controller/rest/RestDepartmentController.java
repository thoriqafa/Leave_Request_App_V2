package id.co.mii.clientapp.controller.rest;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    
    @GetMapping("/{id}")
    public Department getById(@PathVariable Long id){
        return departmentService.getById(id);
    }
    
    
    @PostMapping
    @PreAuthorize("hasRole('admin')")
    public Department create(@RequestBody Department department){
        return departmentService.create(department);
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public Department update(@PathVariable Long id, @RequestBody Department department){
        return departmentService.update(id, department);
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public Department delete(@PathVariable Long id){
        return departmentService.delete(id);
    }
    
}
