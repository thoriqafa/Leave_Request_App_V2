package id.co.mii.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.model.LeaveRequest;

@Service
public class LeaveRequestService {
    
    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/leave/request")
    private String url;

    public List<LeaveRequest> getAll(){
        return restTemplate.exchange(
            url,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<LeaveRequest>>() {
            }).getBody();
    }
    
    public List<LeaveRequest> getAllRequest(){
        return restTemplate.exchange(
            url + "/requests",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<LeaveRequest>>() {
            }).getBody();
    }
    
    public List<LeaveRequest> getAllMyRequest(){
        return restTemplate.exchange(
            url + "/my",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<LeaveRequest>>() {
            }).getBody();
    }

    public LeaveRequest getById(Long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<LeaveRequest>() {
                }).getBody();
    }

    public LeaveRequest create(LeaveRequest leaveRequest){
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                new HttpEntity(leaveRequest),
                new ParameterizedTypeReference<LeaveRequest>() {
                }).getBody();
    }

    public LeaveRequest update(Long id, LeaveRequest leaveRequest) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(leaveRequest),
                new ParameterizedTypeReference<LeaveRequest>() {
                }).getBody();
    }

    public LeaveRequest approved(Long id, LeaveRequest leaveRequest) {
        return restTemplate.exchange(
                url + "/approve/" + id,
                HttpMethod.PUT,
                new HttpEntity(leaveRequest),
                new ParameterizedTypeReference<LeaveRequest>() {
                }).getBody();
    }
    
    public LeaveRequest rejected(Long id, LeaveRequest leaveRequest) {
        return restTemplate.exchange(
                url + "/reject/" + id,
                HttpMethod.PUT,
                new HttpEntity(leaveRequest),
                new ParameterizedTypeReference<LeaveRequest>() {
                }).getBody();
    }
    
    public LeaveRequest cancelRequest(Long id, LeaveRequest leaveRequest) {
        return restTemplate.exchange(
                url + "/cancel/" + id,
                HttpMethod.PUT,
                new HttpEntity(leaveRequest),
                new ParameterizedTypeReference<LeaveRequest>() {
                }).getBody();
    }
    
}
