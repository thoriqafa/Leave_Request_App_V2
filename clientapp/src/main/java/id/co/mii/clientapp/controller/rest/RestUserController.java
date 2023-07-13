package id.co.mii.clientapp.controller.rest;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import id.co.mii.clientapp.model.User;
import id.co.mii.clientapp.service.UserService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class RestUserController {
    
    private UserService userService;

    @GetMapping
    public List<User> getAll(){
        return userService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public User getById(@PathVariable Long id){
        return userService.getById(id);
    }

    @GetMapping("/current-username")
    public String getCurrentUsername(){
        return userService.getCurrentUsername();
    }

    @PostMapping
    @PreAuthorize("hasRole('admin')")
    public User create(@RequestBody User user){
        return userService.create(user);
    }    
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public User update(@PathVariable Long id, @RequestBody User user){
        return userService.update(id, user);
    }    
}