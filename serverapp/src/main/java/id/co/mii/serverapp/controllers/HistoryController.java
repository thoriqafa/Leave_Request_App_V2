package id.co.mii.serverapp.controllers;

import id.co.mii.serverapp.models.History;
import id.co.mii.serverapp.services.HistoryService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@AllArgsConstructor
@RequestMapping("/leave/history")
public class HistoryController {
    private HistoryService historyService;
    
    @GetMapping
    public List<History> getAll(){
        return historyService.getAll();
    }
}
