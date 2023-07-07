package id.co.mii.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import id.co.mii.clientapp.model.LeaveStatus;

@Service
public class LeaveStatusService {
    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/leave/status")
    private String url;

    public List<LeaveStatus> getAll(){
        return restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<LeaveStatus>>() {
            }).getBody();
    }
}
