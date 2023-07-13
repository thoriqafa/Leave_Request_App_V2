package id.co.mii.serverapp.services;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.LeaveBalance;
import id.co.mii.serverapp.models.User;
import id.co.mii.serverapp.repositories.LeaveBalanceRepository;
import id.co.mii.serverapp.repositories.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LeaveBalanceService {
    
    private LeaveBalanceRepository leaveBalanceRepository;
    private UserRepository userRepository;

    public LeaveBalance getMyBalance(Authentication authentication){
        User user = userRepository.findByUsername(authentication.getName());
        Employee employee = user.getEmployee();
        return leaveBalanceRepository.findByEmployee(employee);
    }
}
