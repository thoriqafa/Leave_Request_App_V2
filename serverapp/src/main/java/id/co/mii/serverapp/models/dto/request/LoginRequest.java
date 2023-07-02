package id.co.mii.serverapp.models.dto.request;

import lombok.Data;

/**
 *
 * @author Fathur
 */
@Data
public class LoginRequest {
    
    private String username;
    private String password;

}
