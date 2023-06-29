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

import id.co.mii.serverapp.models.Role;
import id.co.mii.serverapp.services.RoleService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/role")
public class RoleController {
    
    private RoleService roleService;

    @PostMapping
    public Role create(@RequestBody Role role){
        return roleService.create(role);
    }

    @GetMapping
    public List<Role> getAll(){
        return roleService.getAll();
    }

    @GetMapping("/{id}")
    public Role getById(@PathVariable Long id){
        return roleService.getById(id);
    }

    @PutMapping("/{id}")
    public Role update(@PathVariable Long id, @RequestBody Role role){
        return roleService.update(id, role);
    }

    @DeleteMapping("/{id}")
    public Role delete(@PathVariable Long id){
        return roleService.delete(id);
    }

}
