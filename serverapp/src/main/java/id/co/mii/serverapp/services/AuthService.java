package id.co.mii.serverapp.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import id.co.mii.serverapp.models.User;
import id.co.mii.serverapp.models.dto.request.LoginRequest;
import id.co.mii.serverapp.models.dto.response.LoginResponse;
import id.co.mii.serverapp.repositories.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {

    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private AppUserDetailService appUserDetailService;

    public LoginResponse login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(),
                loginRequest.getPassword());

        Authentication auth = authenticationManager.authenticate(authRequest);
        SecurityContextHolder.getContext().setAuthentication(auth);

        User user = userRepository
                .findByUsernameOrEmployeeEmail(
                        loginRequest.getUsername(),
                        loginRequest.getUsername())
                .get();

        UserDetails userDetails = appUserDetailService.loadUserByUsername(loginRequest.getUsername());
        List<String> authorities = userDetails
                .getAuthorities()
                .stream()
                .map(authority -> authority.getAuthority())
                .collect(Collectors.toList());

        return new LoginResponse(
                user.getUsername(),
                user.getEmployee().getEmail(),
                authorities);
    }
}
