package id.co.mii.serverapp.services;

import id.co.mii.serverapp.models.Department;
import id.co.mii.serverapp.models.LeaveType;
import id.co.mii.serverapp.repositories.LeaveTypeRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class LeaveTypeService {

  private LeaveTypeRepository leaveTypeRepository;

  public List<LeaveType> getAll() {
    return leaveTypeRepository.findAll();
  }

  public LeaveType getById(Long id) {
    return leaveTypeRepository
      .findById(id)
      .orElseThrow(() ->
        new ResponseStatusException(
          HttpStatus.NOT_FOUND,
          "Leave type not found!!!"
        )
      );
  }

  public LeaveType create(LeaveType leaveType){
    if (leaveTypeRepository.findByName(leaveType.getName()).isPresent()) {
      throw new ResponseStatusException(
        HttpStatus.CONFLICT,
        "Department already exists!!!"
      );
    }
    return leaveTypeRepository.save(leaveType);
  }

  public LeaveType update(Long id, LeaveType leaveType) {
    getById(id);
    leaveType.setId(id);
    return leaveTypeRepository.save(leaveType);
  }

  public LeaveType delete(Long id){
    LeaveType leaveType = getById(id);
    leaveTypeRepository.delete(leaveType);
    return leaveType;
  }
}
