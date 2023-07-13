package id.co.mii.clientapp.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class History {
    private Long id;
    private LocalDate date;
    private String remarked;
    private Employee employee;
    private LeaveStatus leaveStatus;
    private LeaveRequest leaveRequest;
}
