package id.co.mii.serverapp.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.serverapp.models.LeaveBalance;
import id.co.mii.serverapp.services.LeaveBalanceService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/leavebalance")
@AllArgsConstructor
public class LeaveBalanceController {
    
    private LeaveBalanceService leaveBalanceService;

    @GetMapping("/my")
    public LeaveBalance getMyBalance(Authentication authentication){
        return leaveBalanceService.getMyBalance(authentication);
    }

}
