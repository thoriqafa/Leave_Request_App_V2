package id.co.mii.serverapp.services;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.History;
import id.co.mii.serverapp.models.LeaveRequest;
import id.co.mii.serverapp.models.LeaveStatus;
import id.co.mii.serverapp.models.User;
import id.co.mii.serverapp.models.dto.request.LeaveRequestApply;
import id.co.mii.serverapp.repositories.HistoryRepository;
import id.co.mii.serverapp.repositories.LeaveRequestRepository;
import id.co.mii.serverapp.repositories.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LeaveRequestService {

    private LeaveRequestRepository leaveRequestRepository;
    private HistoryRepository historyRepository;
    private LeaveStatusService leaveStatusService;
    private UserRepository userRepository;
    private ModelMapper modelMapper;


    public List<LeaveRequest> getAll() {
    return leaveRequestRepository.findAll();
    }
    
    public LeaveRequest getById(Long id){
        return leaveRequestRepository
        .findById(id)
                .orElseThrow(()
                        -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employee not found!!!"
                )
                );
    }

    public LeaveRequest create(LeaveRequestApply leaveRequestApply){
        LeaveRequest leaveRequest = modelMapper.map(leaveRequestApply, LeaveRequest.class);
        History history = modelMapper.map(leaveRequestApply, History.class);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username);

        Employee employee = user.getEmployee();

        //set pending status
        LeaveStatus leaveStatus = leaveStatusService.getById(1L);
        leaveRequest.setLeaveStatus(leaveStatus);
        leaveRequest.setEmployee(employee);

        leaveRequest = leaveRequestRepository.save(leaveRequest);

        history.setLeaveRequest(leaveRequest);
        history.setEmployee(employee);
        history.setDate(LocalDateTime.now());
        history.setLeaveStatus(leaveStatus);
        historyRepository.save(history);
        
        return leaveRequest;
    }

    public LeaveRequest approve(Long id, LeaveRequestApply leaveRequestApply){
        LeaveRequest leaveRequest = modelMapper.map(leaveRequestApply, LeaveRequest.class);
        History history = modelMapper.map(leaveRequestApply, History.class);
        
        getById(id);
        leaveRequest.setId(id);
        
//        LeaveStatus leaveStatus = leaveStatusService.getById(2L);
//        leaveRequest.setLeaveStatus(leaveStatus);

        leaveRequest.setEmployee(leaveRequest.getEmployee());

        leaveRequest = leaveRequestRepository.save(leaveRequest);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username);

        Employee employee = user.getEmployee();

        history.setLeaveRequest(leaveRequest);
        history.setRemarked(leaveRequestApply.getRemarked());
        history.setEmployee(employee);
        history.setDate(LocalDateTime.now());
        historyRepository.save(history);

        return leaveRequest;
    }

}
