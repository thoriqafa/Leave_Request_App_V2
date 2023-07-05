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
    private Role role;
    private Employee employee;

}
