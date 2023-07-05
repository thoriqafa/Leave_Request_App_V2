package id.co.mii.serverapp.models;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_employee")
public class Employee {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(length = 25, nullable = false)
  private String name;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(length = 13)
  private String phone;

  @ManyToOne
  @JoinColumn(name = "gender")
  private Gender gender;

  @Column(length = 1)
  private Boolean is_married;

  @Column(length = 20)
  private LocalDateTime hire_date;
  
  @Column(length = 20)
  private String address;

  @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
  // @JsonProperty(access = JsonProperty.Access.WRITE_ONLY) //menghindari looping infiniti
  @PrimaryKeyJoinColumn
  private User user;
  
  @ManyToOne
  @JoinColumn(name = "department")
  private Department department;
  
  @ManyToOne
  @JoinColumn(name = "manager")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Employee employee;

  @OneToMany(mappedBy = "employee")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<LeaveRequest> leaveRequests;

  @OneToOne(mappedBy = "employee", cascade = CascadeType.ALL)
  @PrimaryKeyJoinColumn
  private LeaveBalance leaveBalance;

  @OneToMany(mappedBy = "employee")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<History> histories;

}
