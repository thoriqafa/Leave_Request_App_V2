package id.co.mii.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.model.History;

@Service
public class LeaveHistoryService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/leave/history")
    private String url;

    public List<History> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<History>>() {
                }).getBody();
    }

    public History getById(Long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<History>() {
                }).getBody();
    }
    
    public List<History> getAllHistory(Long id) {
        return restTemplate.exchange(
                url + "/getMyHistory/" + id,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<History>>() {
                }).getBody();
    }
    
}
