package id.co.mii.clientapp.controller.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import id.co.mii.clientapp.model.LeaveBalance;
import id.co.mii.clientapp.service.LeaveBalanceService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/leavebalance")
@AllArgsConstructor
public class RestLeaveBalanceController {
    
    private LeaveBalanceService leaveBalanceService;

    @GetMapping("/my")
    public LeaveBalance getMyBalance(){
        return leaveBalanceService.geyMyBalance();
    }

}
