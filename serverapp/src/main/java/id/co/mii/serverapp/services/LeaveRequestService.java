package id.co.mii.serverapp.services;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.LeaveRequest;
import id.co.mii.serverapp.models.LeaveStatus;
import id.co.mii.serverapp.models.User;
import id.co.mii.serverapp.models.dto.request.LeaveRequestApply;
import id.co.mii.serverapp.repositories.LeaveRequestRepository;
import id.co.mii.serverapp.repositories.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LeaveRequestService {

    private LeaveRequestRepository leaveRequestRepository;
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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username);

        Employee employee = user.getEmployee();

        //set pending status
        LeaveStatus leaveStatus = leaveStatusService.getById(1L);
        leaveRequest.setLeaveStatus(leaveStatus);

        leaveRequest.setEmployee(employee);
        return leaveRequestRepository.save(leaveRequest);
    }

}
