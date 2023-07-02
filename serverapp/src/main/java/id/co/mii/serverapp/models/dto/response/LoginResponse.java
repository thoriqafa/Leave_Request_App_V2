package id.co.mii.serverapp.models.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 *
 * @author Fathur
 */
@Data
@AllArgsConstructor
public class LoginResponse {
    
    private String username;
    private String password;
    private List<String> authorities;

}
