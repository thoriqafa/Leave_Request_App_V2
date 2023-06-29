package id.co.mii.serverapp.services;

import id.co.mii.serverapp.models.Department;
import id.co.mii.serverapp.repositories.DepartmentRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class DepartmentService {

  private DepartmentRepository departmentRepository;

  public List<Department> getAll() {
    return departmentRepository.findAll();
  }

  public Department getById(Long id) {
    return departmentRepository
      .findById(id)
      .orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Department Not Found"
        )
      );
  }

  public Department create(Department department) {
    if (departmentRepository.findByName(department.getName()).isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "Department already exists!!!"
      );
    }
    return departmentRepository.save(department);
  }

  public Department update(Long id, Department department) {
    getById(id);
    department.setId(id);
    return departmentRepository.save(department);
  }

  public Department delete(Long id){
    Department department = getById(id);
    departmentRepository.delete(department);
    return department;
  }
}
