package id.co.mii.clientapp.controller.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.model.LeaveRequest;
import id.co.mii.clientapp.service.LeaveRequestService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/leaverequest")
@AllArgsConstructor 
public class RestLeaveRequestController {
    public LeaveRequestService leaveRequestService;

    @GetMapping
    public List<LeaveRequest> getAll(){
        return leaveRequestService.getAll();
    }

    @GetMapping("/{id}")
    public LeaveRequest getById(@PathVariable Long id){
        return leaveRequestService.getById(id);
    }

    @PostMapping
    public LeaveRequest create(@RequestBody LeaveRequest leaveRequest){
        return leaveRequestService.create(leaveRequest);
    }

    @PutMapping("/{id}")
    public LeaveRequest update(@PathVariable Long id, @RequestBody LeaveRequest leaveRequest){
        return leaveRequestService.update(id, leaveRequest);
    }
}
