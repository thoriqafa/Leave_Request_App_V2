package id.co.mii.clientapp.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    
    private Long id;
    private String name;
    private String email;
    private String phone;
    private Gender gender;
    private Boolean is_married;
    private LocalDate hire_date;
    private String address;
    private User user;
    // private Department department;
    private Employee employee;

}
