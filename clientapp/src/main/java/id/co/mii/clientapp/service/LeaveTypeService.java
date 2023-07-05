package id.co.mii.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.model.LeaveType;

@Service
public class LeaveTypeService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/leave/type")
    private String url;

    public List<LeaveType> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<LeaveType>>() {
                }).getBody();
    }

    public LeaveType getById(Long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<LeaveType>() {
                }).getBody();
    }

    public LeaveType create(LeaveType leaveType) {
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                new HttpEntity(leaveType),
                new ParameterizedTypeReference<LeaveType>() {
                }).getBody();
    }
    
    public LeaveType update(Long id, LeaveType leaveType) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(leaveType),
                new ParameterizedTypeReference<LeaveType>() {
                }).getBody();
    }
    
    public LeaveType delete(Long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null,
                new ParameterizedTypeReference<LeaveType>() {
                }).getBody();
    }

}
