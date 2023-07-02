package id.co.mii.serverapp.controllers;

import id.co.mii.serverapp.models.LeaveType;
import id.co.mii.serverapp.services.LeaveTypeService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/leave/type")
@AllArgsConstructor
public class LeaveTypeController {

    private LeaveTypeService leaveTypeService;

    @GetMapping
    public List<LeaveType> getAll(){
        return leaveTypeService.getAll();
    }

    @GetMapping("/{id}")
    public LeaveType getById(@PathVariable Long id){
        return leaveTypeService.getById(id);
    }

    @PostMapping
    public LeaveType create(@RequestBody LeaveType leaveType){
        return leaveTypeService.create(leaveType);
    }

    @PutMapping("/{id}")
    public LeaveType update(@PathVariable Long id, @RequestBody LeaveType leaveType){
        return leaveTypeService.update(id, leaveType);
    }

    @DeleteMapping("/{id}")
    public LeaveType delete(@PathVariable Long id){
        return leaveTypeService.delete(id);
    }

}
