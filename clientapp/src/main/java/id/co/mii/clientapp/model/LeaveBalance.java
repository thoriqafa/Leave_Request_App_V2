package id.co.mii.clientapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaveBalance {
    
    private Long id;
    private Integer current_year;
    private Integer last_year;

}
