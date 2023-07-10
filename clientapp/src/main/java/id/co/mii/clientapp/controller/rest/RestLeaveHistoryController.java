package id.co.mii.clientapp.controller.rest;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.model.History;
import id.co.mii.clientapp.service.LeaveHistoryService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/history")
@PreAuthorize("hasAnyRole('manager','employee')")
@AllArgsConstructor 
public class RestLeaveHistoryController {
    private LeaveHistoryService leaveHistoryService;

    @GetMapping
    public List<History> getAll(){
        return leaveHistoryService.getAll();
    }

    @GetMapping("/{id}")
    public History getById(@PathVariable Long id){
        return leaveHistoryService.getById(id);
    }

}
