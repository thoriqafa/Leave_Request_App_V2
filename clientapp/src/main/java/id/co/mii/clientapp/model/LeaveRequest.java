package id.co.mii.clientapp.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaveRequest {
    private Long id;
    private LocalDate start_date;
    private LocalDate end_date;
    private Integer duration;
    private String attachment;
    private String remarked;
    private String notes;
    private Employee employee;
    private LeaveType leaveType;
    private LeaveStatus leaveStatus;
}
