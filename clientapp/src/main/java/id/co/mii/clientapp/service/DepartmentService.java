package id.co.mii.clientapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import id.co.mii.clientapp.model.Department;

@Service
public class DepartmentService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/department")
    private String url;

    public List<Department> getAll() {
        return restTemplate.exchange(
                url,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<List<Department>>() {
                }).getBody();
    }

    public Department getById(Long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Department>() {
                }).getBody();
    }

    public Department create(Department department) {
        return restTemplate.exchange(
                url,
                HttpMethod.POST,
                new HttpEntity(department),
                new ParameterizedTypeReference<Department>() {
                }).getBody();
    }

    public Department update(Long id, Department department) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.PUT,
                new HttpEntity(department),
                new ParameterizedTypeReference<Department>() {
                }).getBody();
    }

    public Department delete(Long id) {
        return restTemplate.exchange(
                url + "/" + id,
                HttpMethod.DELETE,
                null,
                new ParameterizedTypeReference<Department>() {
                }).getBody();
    }

}
