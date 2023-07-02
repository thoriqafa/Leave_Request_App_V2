/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package id.co.mii.serverapp.repositories;

import id.co.mii.serverapp.models.LeaveStatus;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Thoriq
 */
public interface LeaveStatusRepository extends JpaRepository<LeaveStatus, Long>{
    Optional<LeaveStatus> findByName(String name);   
}
