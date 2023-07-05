package id.co.mii.serverapp.services;

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.LeaveBalance;
import id.co.mii.serverapp.models.Role;
import id.co.mii.serverapp.models.User;
import id.co.mii.serverapp.models.dto.request.UserRequest;
import id.co.mii.serverapp.repositories.UserRepository;

import java.util.List;
import lombok.AllArgsConstructor;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class UserService {

  private UserRepository userRepository;
  private RoleService roleService;
  private PasswordEncoder passwordEncoder;

  private ModelMapper modelMapper;

  public List<User> getAll() {
    return userRepository.findAll();
  }

  public User getById(Long id) {
    return userRepository
        .findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found!!!"));
  }

  public User create(UserRequest userRequest) {
    Employee employee = modelMapper.map(userRequest, Employee.class);
    employee.setDepartment(userRequest.getDepartment());
    
    User user = modelMapper.map(userRequest, User.class);

    // set default role
    // Role role = roleService.getById(2L);
    // user.setRole(role);

    user.setEmployee(employee);
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    employee.setUser(user);

    return userRepository.save(user);
  }

  // public User create(User user) {
  // return userRepository.save(user);
  // }

  public User update(Long id, User user) {
    getById(id);
    user.setId(id);
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    if (user.getRole() != null) {
      user.setRole(user.getRole());
    }

    return userRepository.save(user);
  }

  public User delete(Long id) {
    User user = getById(id);
    userRepository.delete(user);
    return user;
  }

  public User addRole(Long id, Role role) {
    User user = getById(id);
    Role isAvailableRole = roleService.getById(role.getId());
    user.setRole(isAvailableRole);
    return userRepository.save(user);
  }
}
