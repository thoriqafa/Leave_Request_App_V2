package id.co.mii.clientapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

public class LoginService {
    
    @Autowired
    private RestTemplate restTemplate;

    @Value("${server.baseUrl}/login")
    private String url;

    // public Boolean login(){

    // }
}
