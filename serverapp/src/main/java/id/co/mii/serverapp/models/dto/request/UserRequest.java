package id.co.mii.serverapp.models.dto.request;

import id.co.mii.serverapp.models.Department;
import id.co.mii.serverapp.models.Gender;
import id.co.mii.serverapp.models.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Fathur
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

  private String username;
  private String password;
  private String name;
  private String email;
  private String phone;
  private Gender gender;
  private Department department;
  private Role role;

}
