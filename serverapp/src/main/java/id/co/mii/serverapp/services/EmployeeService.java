package id.co.mii.serverapp.services;

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.User;
import id.co.mii.serverapp.models.dto.request.EmployeeRequest;
import id.co.mii.serverapp.repositories.EmployeeRepository;
import id.co.mii.serverapp.repositories.UserRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class EmployeeService {

    private EmployeeRepository employeeRepository;
    private DepartmentService departmentService;
    private ModelMapper modelMapper;

    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    public Employee getById(Long id) {
        return employeeRepository
                .findById(id)
                .orElseThrow(()
                        -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Employee not found!!!"
                )
                );
    }

    public Employee create(EmployeeRequest employeeRequest) {
        Employee employee = modelMapper.map(employeeRequest, Employee.class);
        return employeeRepository.save(employee);
    }

    public Employee update(Long id, EmployeeRequest employeeRequest) {
        Employee employee = modelMapper.map(employeeRequest, Employee.class);

        getById(id);
        employee.setId(id);

        employee.setDepartment(departmentService.getById(employeeRequest.getDepartment().getId()));

        if (employeeRequest.getEmployee() != null) {
            employee.setEmployee(getById(employeeRequest.getEmployee().getId()));
        }
        return employeeRepository.save(employee);
    }

    public Employee delete(Long id) {
        Employee employee = getById(id);        
        employeeRepository.delete(employee);
        return employee;
    }
}
