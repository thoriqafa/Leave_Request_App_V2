package id.co.mii.serverapp.models.dto.request;

import java.time.LocalDateTime;

import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.LeaveStatus;
import id.co.mii.serverapp.models.LeaveType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaveRequestApply {

  private LocalDateTime start_date;
  private LocalDateTime end_date;
  private String attachment;
  private String notes;
  private String remarked;
  private LeaveType leaveType;
  private Employee employee;
  private LeaveStatus leaveStatus;
}
