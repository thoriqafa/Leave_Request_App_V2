package id.co.mii.serverapp.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.serverapp.models.LeaveRequest;
import id.co.mii.serverapp.models.dto.request.LeaveRequestApply;
import id.co.mii.serverapp.services.LeaveRequestService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/leave/request")
public class LeaveRequestController {
    private LeaveRequestService leaveRequestService;

    @GetMapping
    public List<LeaveRequest> getAll(){
        return leaveRequestService.getAll();
    }
    
    @GetMapping("/{id}")
    public LeaveRequest getById(@PathVariable Long id){
        return leaveRequestService.getById(id);
    }

    @PostMapping
    public LeaveRequest create(@RequestBody LeaveRequestApply leaveRequestApply){
        return leaveRequestService.create(leaveRequestApply);
    }

    @PutMapping("/{id}")
    public LeaveRequest approve(@PathVariable Long id, @RequestBody LeaveRequestApply leaveRequestApply){
        return leaveRequestService.approve(id, leaveRequestApply);
    }
}
