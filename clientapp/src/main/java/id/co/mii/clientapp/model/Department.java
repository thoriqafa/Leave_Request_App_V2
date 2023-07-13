package id.co.mii.clientapp.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Department {
    
    private Long id;
    private String name;
    private Employee manager;

}
