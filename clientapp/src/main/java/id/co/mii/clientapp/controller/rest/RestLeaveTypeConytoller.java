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

import id.co.mii.clientapp.model.LeaveType;
import id.co.mii.clientapp.service.LeaveTypeService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/leavetype")
@AllArgsConstructor
public class RestLeaveTypeConytoller {

    private LeaveTypeService leaveTypeService;

    @GetMapping
    public List<LeaveType> getAll(){
        return leaveTypeService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public LeaveType getById(@PathVariable Long id){
        return leaveTypeService.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasRole('admin')")
    public LeaveType create(@RequestBody LeaveType leaveType){
        return leaveTypeService.create(leaveType);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('admin')")
    public LeaveType update(@PathVariable Long id, @RequestBody LeaveType leaveType){
        return leaveTypeService.update(id, leaveType);
    }
}
