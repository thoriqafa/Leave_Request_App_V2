package id.co.mii.clientapp.controller.rest;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.model.History;
import id.co.mii.clientapp.service.LeaveHistoryService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/history")
@AllArgsConstructor 
public class RestLeaveHistoryController {
    private LeaveHistoryService leaveHistoryService;

    @GetMapping
    public List<History> getAll(){
        return leaveHistoryService.getAll();
    }
}
