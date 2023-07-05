package id.co.mii.serverapp.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tb_user")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String username;

  @Column(nullable = false)
  private String password;

  private Boolean isAccountNonLocked = true;
  private Boolean isEnabled = true;

  @ManyToOne
  @JoinColumn(name = "role", nullable = true)
  private Role role;

  @OneToOne
  @MapsId
  @JoinColumn(name = "id")
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  private Employee employee;  
}
