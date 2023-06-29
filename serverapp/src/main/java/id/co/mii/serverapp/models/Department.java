package id.co.mii.serverapp.models;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "tb_department")
public class Department {

  @Id
  private Long id;

  @Column(length = 25, nullable = false)
  private String name;

  @OneToMany(mappedBy = "department")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private List<Employee> employees;
}
