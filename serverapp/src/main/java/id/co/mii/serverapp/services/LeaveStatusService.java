/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package id.co.mii.serverapp.services;

import id.co.mii.serverapp.models.LeaveStatus;
import id.co.mii.serverapp.repositories.LeaveStatusRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/**
 *
 * @author Thoriq
 */
@Service
@AllArgsConstructor
public class LeaveStatusService {

    private LeaveStatusRepository leaveStatusRepository;

    public List<LeaveStatus> getAll() {
        return leaveStatusRepository.findAll();
    }

    public LeaveStatus getById(Long id) {
        return leaveStatusRepository
                .findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Leave status not Found !!"));
    }

    public LeaveStatus create(LeaveStatus leaveStatus){
        if (leaveStatusRepository.findByName(leaveStatus.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Leave status already exist !");
        }
        return leaveStatusRepository.save(leaveStatus);
    }

    public LeaveStatus update(Long id, LeaveStatus leaveStatus){
        if (leaveStatusRepository.findByName(leaveStatus.getName()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Leave status already exist !");
        }
        getById(id);
        leaveStatus.setId(id);
        return leaveStatusRepository.save(leaveStatus);
    }

    public LeaveStatus delete(Long id){
        LeaveStatus leaveStatus = getById(id);
        leaveStatusRepository.delete(leaveStatus);
        return leaveStatus;
    }
}