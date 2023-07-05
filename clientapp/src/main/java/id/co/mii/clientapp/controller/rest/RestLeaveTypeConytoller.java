package id.co.mii.clientapp.controller.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public LeaveType getById(@PathVariable Long id){
        return leaveTypeService.getById(id);
    }

}
