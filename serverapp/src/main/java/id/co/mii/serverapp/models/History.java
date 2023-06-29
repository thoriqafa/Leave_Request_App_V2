package id.co.mii.serverapp.models;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_history")
public class History {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column
  private String notes;

  @Column(length = 25, nullable = false)
  private LocalDateTime date;

  @ManyToOne
  @JoinColumn(name = "leave_request", nullable = false)
  private LeaveRequest leaveRequest;

  @ManyToOne
  @JoinColumn(name = "leave_status", nullable = false)
  private LeaveStatus leaveStatus;

  @ManyToOne
  @JoinColumn(name = "employee", nullable = false)
  private Employee employee;
}
