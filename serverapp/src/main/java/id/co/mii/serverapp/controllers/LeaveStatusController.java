/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package id.co.mii.serverapp.controllers;

import id.co.mii.serverapp.models.LeaveStatus;
import id.co.mii.serverapp.services.LeaveStatusService;
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

/**
 *
 * @author Thoriq
 */
@RestController
@AllArgsConstructor
@RequestMapping("/leave/status")
public class LeaveStatusController {

    private LeaveStatusService leaveStatusService;

    @GetMapping
    public List<LeaveStatus> getAll(){
        return leaveStatusService.getAll();
    }

    @GetMapping("/{id}")
    public LeaveStatus getById(@PathVariable Long id){
        return leaveStatusService.getById(id);
    }

    @PostMapping
    public LeaveStatus create(@RequestBody LeaveStatus leaveStatus){
        return leaveStatusService.create(leaveStatus);
    }

    @PutMapping("/{id}")
    public LeaveStatus update(@PathVariable Long id, @RequestBody LeaveStatus leaveStatus){
        return leaveStatusService.update(id, leaveStatus);
    }

    @DeleteMapping("/{id}")
    public LeaveStatus delete(@PathVariable Long id){
        return leaveStatusService.delete(id);
    }

}
