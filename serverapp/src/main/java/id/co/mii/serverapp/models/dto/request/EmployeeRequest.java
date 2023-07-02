/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package id.co.mii.serverapp.models.dto.request;

import java.time.LocalDateTime;

import id.co.mii.serverapp.models.Department;
import id.co.mii.serverapp.models.Employee;
import id.co.mii.serverapp.models.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Thoriq
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRequest {

    private String name;
    private String email;
    private String phone;
    private String address;
    private LocalDateTime hire_date;
    private Gender gender;
    private Boolean is_married;
    private Department department;
    private Employee employee;
}
