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
import id.co.mii.serverapp.models.LeaveType;
import id.co.mii.serverapp.models.User;
import id.co.mii.serverapp.models.dto.request.EmailRequest;
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
    private EmailService emailService;

    public List<LeaveRequest> getAll() {
        return leaveRequestRepository.findAll();
    }

    public List<LeaveRequest> getAllRequest(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName());
        Employee employee = user.getEmployee();
        return leaveRequestRepository.findByEmployeeNot(employee);
    }

    public List<LeaveRequest> getAllMyRequest(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName());
        Employee employee = user.getEmployee();
        return leaveRequestRepository.findByEmployee(employee);
    }

    public LeaveRequest getById(Long id) {
        return leaveRequestRepository
                .findById(id)
                .orElseThrow(()
                        -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employee not found!!!"
                )
                );
    }

    public LeaveRequest create(LeaveRequestApply leaveRequestApply) {
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

    public LeaveRequest approve(Long id, LeaveRequestApply leaveRequestApply) {
        LeaveRequest leaveRequest = modelMapper.map(leaveRequestApply, LeaveRequest.class);
        History history = modelMapper.map(leaveRequestApply, History.class);

        getById(id);
        leaveRequest.setId(id);

        LeaveStatus leaveStatus = leaveStatusService.getById(2L);
        leaveRequest.setLeaveStatus(leaveStatus);

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
        history.setLeaveStatus(leaveStatus);
        historyRepository.save(history);

        sendLeaveRequestStatusEmail(leaveRequest, leaveRequestApply.getRemarked());

        return leaveRequest;
    }

    public LeaveRequest reject(Long id, LeaveRequestApply leaveRequestApply) {
        LeaveRequest leaveRequest = modelMapper.map(leaveRequestApply, LeaveRequest.class);
        History history = modelMapper.map(leaveRequestApply, History.class);

        getById(id);
        leaveRequest.setId(id);

        LeaveStatus leaveStatus = leaveStatusService.getById(3L);
        leaveRequest.setLeaveStatus(leaveStatus);

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
        history.setLeaveStatus(leaveStatus);
        historyRepository.save(history);

        sendLeaveRequestStatusEmail(leaveRequest, leaveRequestApply.getRemarked());

        return leaveRequest;
    }
    
    public LeaveRequest cancelRequest(Long id, LeaveRequestApply leaveRequestApply) {
        LeaveRequest leaveRequest = modelMapper.map(leaveRequestApply, LeaveRequest.class);
        History history = modelMapper.map(leaveRequestApply, History.class);

        getById(id);
        leaveRequest.setId(id);

        LeaveStatus leaveStatus = leaveStatusService.getById(4L);
        leaveRequest.setLeaveStatus(leaveStatus);

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
        history.setLeaveStatus(leaveStatus);
        historyRepository.save(history);

        return leaveRequest;
    }

    private void sendLeaveRequestStatusEmail(LeaveRequest leaveRequest, String remarked) {
        String to = leaveRequest.getEmployee().getEmail();
        String subject = "Leave Request Status";
        String name = leaveRequest.getEmployee().getName();
        String status = leaveRequest.getLeaveStatus().getName();
        Integer duration = leaveRequest.getDuration();
        LocalDateTime start_date = leaveRequest.getStart_date();
        LocalDateTime end_date = leaveRequest.getEnd_date();
        String type = leaveRequest.getLeaveType().getName();
        String notes = leaveRequest.getNotes();

        // Menyisipkan data remarked hanya jika ada pada parameter
        String remarks = (remarked != null) ? remarked : "No Remarks - Accepted"; // Simpan remarked dalam variabel remarks terpisah

    
        EmailRequest emailRequest = new EmailRequest(to, subject, name, status, duration, start_date, end_date, type, notes, remarks);
    
        emailService.sendHtmlMessage(emailRequest);
    }
}
