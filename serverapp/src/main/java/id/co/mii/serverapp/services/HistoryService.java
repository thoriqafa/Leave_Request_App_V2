package id.co.mii.serverapp.services;

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.History;
import id.co.mii.serverapp.models.LeaveRequest;
import id.co.mii.serverapp.models.LeaveStatus;
import id.co.mii.serverapp.models.dto.request.LeaveRequestApply;
import id.co.mii.serverapp.repositories.HistoryRepository;
import id.co.mii.serverapp.repositories.LeaveRequestRepository;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class HistoryService {

    private HistoryRepository historyRepository;
    private LeaveRequestRepository leaveRequestRepository;

    public List<History> getAll() {
        return historyRepository.findAll();
    }

    public History getById(Long id) {
        return historyRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        " History not found !"));
    }
    
    public List<History> getAllHistory(Long id){
        LeaveRequest leaveRequest = leaveRequestRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "LeaveRequest not found!"));
        return historyRepository.findByLeaveRequestId(leaveRequest);
    }

}
