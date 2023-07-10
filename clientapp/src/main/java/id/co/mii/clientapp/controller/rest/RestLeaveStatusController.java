package id.co.mii.clientapp.controller.rest;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.model.LeaveStatus;
import id.co.mii.clientapp.service.LeaveStatusService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/leavestatus")
@PreAuthorize("hasAnyRole('manager','employee')")
@AllArgsConstructor 
public class RestLeaveStatusController {
    public LeaveStatusService leaveStatusService;

    @GetMapping
    public List<LeaveStatus> getAll(){
        return leaveStatusService.getAll();
    }
}
