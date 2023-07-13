package id.co.mii.serverapp.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_leave_request")
public class LeaveRequest {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private LocalDate start_date;

  @Column
  private LocalDate end_date;

  @Column
  private Integer duration;

  @Column
  private String attachment;

  @Column(nullable = false)
  private String notes;

  @ManyToOne
  @JoinColumn(name = "employee")
  private Employee employee;

  @ManyToOne
  @JoinColumn(name = "leave_type")
  private LeaveType leaveType;

  @OneToMany(mappedBy = "leaveRequest")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<History> histories;

  @ManyToOne
  @JoinColumn(name = "current_status")
  private LeaveStatus leaveStatus;
}
