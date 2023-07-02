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

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.dto.request.EmployeeRequest;
import id.co.mii.serverapp.services.EmployeeService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/employee")
public class EmployeeController {
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAll(){
        return employeeService.getAll();
    }

    @GetMapping("/{id}")
    public Employee getById(@PathVariable Long id){
        return employeeService.getById(id);
    }

    @PostMapping
    public Employee create(@RequestBody EmployeeRequest employeeRequest){
        return employeeService.create(employeeRequest);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @RequestBody EmployeeRequest employeeRequest){
        return employeeService.update(id, employeeRequest);
    }

    @DeleteMapping("/{id}")
    public Employee delete(@PathVariable Long id){
        return employeeService.delete(id);
    }
}
