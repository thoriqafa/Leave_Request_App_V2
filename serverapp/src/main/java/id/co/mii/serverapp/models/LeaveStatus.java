package id.co.mii.serverapp.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_leave_status")
public class LeaveStatus {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 25, nullable = false)
  private String name;

  @OneToMany(mappedBy = "leaveStatus")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<LeaveRequest> leaveRequests;

  @OneToMany(mappedBy = "leaveStatus")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<History> histories;
}
