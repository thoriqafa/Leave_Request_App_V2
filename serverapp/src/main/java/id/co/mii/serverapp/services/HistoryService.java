package id.co.mii.serverapp.services;

import id.co.mii.serverapp.models.History;
import id.co.mii.serverapp.repositories.HistoryRepository;
import java.util.List;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HistoryService {
    
    private HistoryRepository historyRepository;
    
    public List<History> getAll(){
        return historyRepository.findAll();
    }
    
}
