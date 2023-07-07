package id.co.mii.clientapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    private Long id;
    private String username;
    private String password;
    private String name;
    private String email;
    private String phone;
    private Gender gender;
    private Department department;
    private Role role;

}
