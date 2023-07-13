package id.co.mii.clientapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.model.LeaveBalance;

@Service
public class LeaveBalanceService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/leavebalance")
    private String url;

    public LeaveBalance geyMyBalance() {
        return restTemplate.exchange(
                url + "/my",
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<LeaveBalance>() {
                }).getBody();
    }
}
